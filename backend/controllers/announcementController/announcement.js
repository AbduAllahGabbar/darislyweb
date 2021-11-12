const catchAsync = require("../../utils/catchAsync");
const {
  Announcement,
  Notification,
  Student,
  Attendance,
  CourseGroupSession,
  CourseGroup,
} = require("../../models");
const Sequelize = require("sequelize");
const createPaginationObject = require("../../utils/createPaginationObject");
const { NotificationTypes } = require("../../enums/index");

exports.addAnnouncement = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { title, content } = req.body;

  await Announcement.create(
    {
      title,
      content,
      courseId,
    },
    {
      fields: ["title", "content", "courseId"],
    }
  );

  let students = await Student.findAll({
    include: {
      model: Attendance,
      as: "attendances",
      required: true,
      attributes: [],
      include: {
        model: CourseGroupSession,
        as: "courseGroupSession",
        attributes: [],
        required: true,
        include: {
          model: CourseGroup,
          as: "courseGroup",
          attributes: [],
          required: true,
          where: {
            courseId: courseId,
          },
        },
      },
    },
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("Student.id")), "id"]],
    raw: true,
    nest: true,
  });

  const notificationsObject = students.map((el) => {
    const notification = {};
    notification.studentId = el.id;
    notification.type = NotificationTypes.ANNOUNCEMENT;
    notification.content = JSON.stringify({
      title,
      content,
    });
    return notification;
  });

  Notification.bulkCreate(notificationsObject).catch((err) =>
    console.error(err)
  );

  res.status(200).send();
});

exports.getCourseAnnouncements = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { count, rows } = await Announcement.findAndCountAll({
    where: {
      courseId: courseId,
    },
    attributes: ["id", "title", "content", "createdAt"],
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});
