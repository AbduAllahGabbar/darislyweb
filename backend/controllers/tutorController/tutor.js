const {
  Attendance,
  Tutor,
  Order,
  OrderItem,
  CourseGroupSession,
  CourseGroup,
  Course,
  Subject,
  Area,
  City,
  Student,
  Lecture,
} = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const { sequelize } = require("../../utils/database");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const createPaginationObject = require("../../utils/createPaginationObject");
const errors = require("../../utils/errors");
const { OrderStatusTypes } = require("../../enums/index");

/**
 * getTutors
 * URL: /tutors
 * Method: GET
 * Params: { tutorName, subject, education, grade, area, city}
 * Response: {tutors: [ {name, image, rating, ratingCount, courseId},... ]}
 */

// DONE Parse params and conditionally find the tutors according to them
// TODO Add rating, ratingCount
// DONE add conditions for city and area
// DONE grouping course ids in single object
// DONE pagination

exports.getTutors = catchAsync(async (req, res, next) => {
  const { tutorName, subject, education, grade, area, city } = req.query;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  /* Building tutorCourseInclude array to use it in query */

  const tutorCourseInclude = [];

  // building subject include object

  const subjectAssociation = {
    model: Subject,
    as: "subject",
    attributes: [],
    required: false,
  };

  // building courseGroup include object

  const courseGroupAssociation = {
    model: CourseGroup,
    as: "courseGroups",
    required: false,
    attributes: [],
    include: [],
  };

  if (area)
    courseGroupAssociation.include.push({
      attributes: [],
      model: Area,
      as: "area",
      required: false,
    });

  if (city)
    courseGroupAssociation.include.push({
      attributes: [],
      model: City,
      as: "city",
      required: false,
    });

  // conditionally adding these objects to include array

  if (area || city) tutorCourseInclude.push(courseGroupAssociation);
  if (subject) tutorCourseInclude.push(subjectAssociation);

  /* Retrieve tutors using constructed objects */

  const { count, rows } = await Tutor.findAndCountAll({
    attributes: [["id", "tutorId"], "firstName", "lastName", "hasImage"],
    include: [
      {
        association: "courses",
        attributes: ["id"],
        required: false,
        include: tutorCourseInclude,
      },
    ],
    where: {
      ...(tutorName && { firstName: { [Op.like]: `%${tutorName}%` } }),
      ...(tutorName && { lastName: { [Op.like]: `%${tutorName}%` } }),
      ...(education && { "$courses.education$": education }),
      ...(grade && { "$courses.grade$": grade }),
      ...(subject && {
        "$courses.subject.name$": { [Op.like]: `%${subject}%` },
      }),
      ...(area && {
        "$courses.courseGroups.area.name$": { [Op.like]: `%${area}%` },
      }),
      ...(city && {
        "$courses.courseGroups.city.name$": { [Op.like]: `%${city}%` },
      }),
    },
    offset: offset,
    limit: limit,
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

/**
 * URL: tutors/settings
 * Method: PATCH
 * Body: {firstName, lastName, email, phone, country, countryCode, address, city, area}
 * Response: OK
 */

// DONE retrieve tutorId from logged in user
// TODO add address,city,country

exports.patchTutor = catchAsync(async (req, res, next) => {
  const tutorId = req.user.id;

  await Tutor.update(req.body, {
    where: {
      id: tutorId,
    },
    fields: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "countryCode",
    ],
  });

  res.status(200).end();
});

/**
 * URL: tutors/earnings
 * Method: GET
 * Response: [{online,total}]
 */

exports.getEarnings = catchAsync(async (req, res, next) => {});

/**
 * URL: tutors/stats
 * Method: GET
 * Response: {numberOfEnrolled, totalRevenue}
 */

// DONE retrieve tutorId from logged in user

exports.getStats = catchAsync(async (req, res, next) => {
  const tutorId = req.user.id;

  const stats = (
    await Order.findAll({
      attributes: [
        [
          sequelize.fn(
            "COALESCE",
            sequelize.fn("sum", sequelize.col("orderItems.price")),
            0
          ),
          "totalRevenue",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.fn("DISTINCT", sequelize.col("student_id"))
          ),
          "numberOfEnrolled",
        ],
      ],
      where: {
        status: OrderStatusTypes.CONFIRMED,
      },
      include: {
        model: OrderItem,
        as: "orderItems",
        attributes: [],
        required: true,
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
            include: {
              model: Course,
              as: "course",
              attributes: [],
              required: true,
              where: {
                tutorId: tutorId,
              },
            },
          },
        },
      },
    })
  )[0];

  await res.status(200).json(stats);
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const tutorId = req.user.id;

  const tutor = await Tutor.findByPk(tutorId);

  const isMatch = await bcrypt.compare(
    req.body.oldPassword,
    tutor.password.toString()
  );

  if (!isMatch) {
    throw {
      name: "AuthorizationError",
      body: {
        msg: errors.password.wrong,
        param: "oldPassword",
        location: "body",
      },
    };
  }

  if (req.body.oldPassword === req.body.newPassword) {
    throw {
      name: "ArgumentError",
      body: {
        msg: errors.password.unchanged,
        param: "newPassword",
        location: "body",
      },
    };
  }

  const password = await bcrypt.hash(req.body.newPassword, 10);

  await Tutor.update(
    { password },
    {
      where: {
        id: tutorId,
      },
      fields: ["password"],
    }
  );

  res.status(200).end();
});

exports.getStudentsOfTutor = catchAsync(async (req, res, next) => {
  const tutorId = req.user.id;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { count, rows } = await Student.findAndCountAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "phone",
      "countryCode",
      "country",
      "grade",
      "education",
    ],
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
          include: {
            model: Course,
            as: "course",
            attributes: [],
            required: true,
            where: {
              tutorId: tutorId,
            },
          },
        },
      },
    },
    subQuery: false,
    distinct: true,
    offset: offset,
    limit: limit,
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

exports.getSessions = catchAsync(async (req, res, next) => {
  const tutorId = req.user.id;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const startDate = req.query.from;
  const endDate = req.query.to;

  let { count, rows } = await CourseGroupSession.findAndCountAll({
    attributes: [
      "id",
      "from",
      "to",
      "date",
      [Sequelize.col("courseGroup.type"), "type"],
      [Sequelize.col("courseGroup->course.education"), "education"],
      [Sequelize.col("courseGroup->course->subject.name"), "subject"],
    ],
    include: [
      {
        model: CourseGroup,
        as: "courseGroup",
        required: true,
        attributes: [],
        include: {
          model: Course,
          as: "course",
          required: true,
          attributes: [],
          where: {
            tutorId: tutorId,
          },
          include: {
            model: Subject,
            as: "subject",
          },
        },
      },
      {
        model: Lecture,
        as: "lecture",
        attributes: ["title", "id"],
      },
    ],
    offset: offset,
    limit: limit,
    ...((startDate || endDate) && {
      where: Sequelize.where(
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
    }),
  });

  rows = rows.map((el) => {
    el.from = `${el.date}T${el.from}Z`;
    el.to = `${el.date}T${el.to}Z`;
    el.date = undefined;
    return el;
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});
