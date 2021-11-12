const Sequelize = require("sequelize");
const { sequelize } = require("../../models/index");
const {
  Lecture,
  Section,
  CourseGroup,
  CourseGroupSession,
  Attendance,
} = require("../../models");
const { UserRoles } = require("../../enums");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { OrderStatusTypes } = require("../../enums/index");

exports.patchLecture = catchAsync(async (req, res, next) => {
  const { lectureId } = req.params;

  const { sectionId, title, price } = req.body;

  await sequelize.transaction(async (transaction) => {
    const lecture = await Lecture.findByPk(lectureId, {
      transaction,
    });

    if (!lecture) throw new AppError("Lecture not found", 404);

    if (title) lecture.title = title;
    if (price) lecture.price = price;

    if (sectionId) {
      let lastLectureOrder;

      await Lecture.increment(
        {
          order: -1,
        },
        {
          where: {
            sectionId: lecture.sectionId,
            order: {
              [Sequelize.Op.gt]: lecture.order,
            },
          },
          transaction,
        }
      );

      lastLectureOrder = await Lecture.max("order", {
        where: {
          sectionId: sectionId,
          id: {
            [Sequelize.Op.ne]: lecture.id,
          },
        },
        transaction,
      });

      lecture.order = lastLectureOrder ? lastLectureOrder + 1 : 0;
      lecture.sectionId = sectionId;
    }

    await lecture.save({
      transaction,
    });
  });

  res.status(200).send();
});

exports.patchSection = catchAsync(async (req, res, next) => {
  const { sectionId } = req.params;

  const { courseId, title } = req.body;

  await sequelize.transaction(async (transaction) => {
    const section = await Section.findByPk(sectionId, {
      transaction,
    });

    if (!section) throw new AppError("Section not found", 404);

    if (title) section.title = title;

    if (courseId) {
      let lastSectionOrder;

      await Section.increment(
        {
          order: -1,
        },
        {
          where: {
            courseId: section.courseId,
            order: {
              [Sequelize.Op.gt]: section.order,
            },
          },
          transaction,
        }
      );

      lastSectionOrder = await Section.max("order", {
        where: {
          courseId: courseId,
          id: {
            [Sequelize.Op.ne]: section.id,
          },
        },
        transaction,
      });

      section.order = lastSectionOrder ? lastSectionOrder + 1 : 0;
      section.courseId = courseId;
    }

    await section.save({
      transaction,
    });
  });

  res.status(200).send();
});

exports.getCourseGroupLectures = catchAsync(async (req, res, next) => {
  const { courseGroupId } = req.params;

  const startDate = req.query.from;
  const endDate = req.query.to;

  const studentId = req.user.id;

  const sections = await Section.findAll({
    include: {
      model: Lecture,
      as: "lectures",
      attributes: ["id", "title", "order", "price"],
      required: true,
      include: {
        model: CourseGroupSession,
        as: "courseGroupSession",
        attributes: [
          "id",
          "from",
          "to",
          "date",
          "productId",
          [
            Sequelize.literal(
              `(SELECT EXISTS(SELECT * FROM \`order\` INNER JOIN \`order_item\` ON \`order_item\`.\`order_id\` = \`order\`.\`id\` WHERE \`order\`.\`student_id\` = ${studentId} AND \`order_item\`.\`course_group_session_id\` = \`lectures->courseGroupSession\`.\`id\` AND \`order\`.\`status\` IN (${OrderStatusTypes.CONFIRMED},${OrderStatusTypes.UNCONFIRMED} ) LIMIT 1) AS \`exists\`)`
            ),
            "purchased",
          ],
          [
            Sequelize.literal(
              `(SELECT EXISTS(SELECT * FROM \`cart_item\` INNER JOIN \`course_group_session\`
              ON \`cart_item\`.\`product_id\` = \`course_group_session\`.\`product_id\`
              WHERE \`cart_item\`.\`student_id\` = ${studentId} AND \`course_group_session\`.\`id\` = \`lectures->courseGroupSession\`.\`id\` LIMIT 1) AS \`exists\`)`
            ),
            "addedToCart",
          ],
        ],
        required: true,
        where: {
          courseGroupId: courseGroupId,
          ...((startDate || endDate) && {
            [Sequelize.Op.and]: [
              Sequelize.where(
                Sequelize.cast(
                  Sequelize.fn(
                    "concat",
                    Sequelize.col("date"),
                    "T",
                    Sequelize.col("from")
                  ),
                  "DATETIME"
                ),
                {
                  ...(startDate && { [Sequelize.Op.gte]: startDate }),
                  ...(endDate && { [Sequelize.Op.lte]: endDate }),
                }
              ),
            ],
          }),
        },
      },
    },
    attributes: ["id", "courseId", "title", "order"],
    order: ["order", ["lectures", "order"]],
  });

  for (let i = 0; i < sections.length; i++) sections[i] = sections[i].toJSON();

  sections.forEach((section) => {
    const lectures = section.lectures;
    const sessions = [];

    if (lectures)
      lectures.forEach((lecture) => {
        const sessionInfo = lecture.courseGroupSession;
        lecture.courseGroupSession = undefined;
        sessionInfo.lecture = lecture;
        sessions.push(sessionInfo);
      });

    section.sessions = sessions;
    section.lectures = undefined;
  });

  res.status(200).json(sections);
});

exports.getCourseMaterialLectures = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const sections = await Section.findAll({
    attributes: ["id", "title"],
    include: {
      model: Lecture,
      as: "lectures",
      attributes: ["id", "title", "price"],
      ...(req.user.dataValues.role === UserRoles.STUDENT
        ? {
            include: {
              model: CourseGroupSession,
              as: "courseGroupSession",
              attributes: [],
              required: true,
              include: {
                model: Attendance,
                as: "attendances",
                attributes: [],
                where: { studentId: req.user.id },
                required: true,
              },
            },
          }
        : {}),
    },
    where: {
      courseId,
    },
    order: ["order", ["lectures", "order"]],
  });

  res.status(200).json(sections);
});

exports.getLectureSessions = catchAsync(async (req, res, next) => {
  const { lectureId } = req.params;

  const sessions = await CourseGroupSession.findAll({
    attributes: ["date", "from", "to", "id"],
    where: {
      lectureId,
    },
  });

  res.status(200).json(sessions);
});
