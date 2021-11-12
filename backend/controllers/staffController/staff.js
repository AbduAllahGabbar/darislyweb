const {
  Center,
  StaffCenter,
  Staff,
  Student,
  Order,
  OrderItem,
  CourseGroupSession,
  CourseGroup,
  Course,
  Lecture,
  Subject,
  Tutor,
  Attendance,
} = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const createPaginationObject = require("../../utils/createPaginationObject");
const { sequelize } = require("../../models/index");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const errors = require("../../utils/errors");
const e = require("express");
const { AttendanceTypes } = require("../../enums");

/**
 * Get Students Orders
 * URL: /orders
 * Method: GET
 * Params: { pageNumber, limit, countryCode, phoneNumber, studentName}
 * Response: [{ id, hasImage, studentName, phone, tutorName, subject, orderId, price, paymentStatus }]
 */

// DONE get staffId from logged in user

exports.getStudentOrders = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { search } = req.query;

  let { count, rows } = await Order.findAndCountAll({
    attributes: [
      "id",
      "status",
      "createdAt",
      "token",
      "fawryReferenceNumber",
      [
        Sequelize.col(
          "orderItems->courseGroupSession->lecture->course->tutor.first_name"
        ),
        "tutorFirstName",
      ],
      [
        Sequelize.col(
          "orderItems->courseGroupSession->lecture->course->tutor.last_name"
        ),
        "tutorLastName",
      ],
      [
        Sequelize.col(
          "orderItems->courseGroupSession->lecture->course->subject.name"
        ),
        "subject",
      ],
      // [Sequelize.fn("sum", Sequelize.col("orderItems.price")), "total"],
    ],
    include: [
      {
        model: Student,
        as: "student",
        attributes: [
          "firstName",
          "lastName",
          "countryCode",
          "phone",
          "hasImage",
        ],
      },
      {
        model: OrderItem,
        as: "orderItems",
        attributes: ["id", "price"],
        required: true,
        include: {
          model: CourseGroupSession,
          as: "courseGroupSession",
          attributes: ["id"],
          required: true,
          include: {
            model: Lecture,
            as: "lecture",
            attributes: ["title"],
            required: true,
            include: {
              model: Course,
              as: "course",
              attributes: [],
              include: [
                {
                  model: Subject,
                  as: "subject",
                  attributes: [],
                },
                {
                  model: Tutor,
                  as: "tutor",
                  attributes: [],
                },
              ],
            },
          },
        },
      },
    ],
    where: {
      ...(search && {
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              "concat",
              Sequelize.col("student.first_name"),
              " ",
              Sequelize.col("student.last_name")
            ),
            {
              [Sequelize.Op.like]: `%${search}%`,
            }
          ),
          Sequelize.where(
            Sequelize.fn(
              "concat",
              Sequelize.col("student.country_code"),
              Sequelize.col("student.phone")
            ),
            {
              [Sequelize.Op.like]: `%${search}%`,
            }
          ),
          {
            fawryReferenceNumber: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
        ],
      }),
    },
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
    subQuery: false,
    distinct: true,
  });

  rows = rows.map((row) => {
    row = row.toJSON();
    let totalPrice = 0;
    row.lectures = [];
    row.tutor = {
      firstName: row.tutorFirstName,
      lastName: row.tutorLastName,
    };
    delete row.tutorFirstName;
    delete row.tutorLastName;
    row.orderItems.forEach((orderItem) => {
      totalPrice += orderItem.price;
      row.lectures.push(orderItem.courseGroupSession.lecture.title);
    });
    row.total = totalPrice;
    delete row.orderItems;
    return row;
  }); // 4688

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

/**
 * Validate Payment
 * URL: /orders/{orderId}/validate
 * Method: PATCH
 * Body: {paymentStatus}
 * Response: OK
 */

exports.validateOrderPayment = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;

  const order = await Order.findByPk(orderId, {
    attributes: ["id", "status"],
  });

  order.status = paymentStatus;

  await order.save();

  res.status(200).json(order);
});

/**
 * Get Groups
 * URL: /coursegroups
 * Method: GET
 * Response: [{ hasImage, tutorId, tutorName, subject, grade, education, capacity, numberOfStudents, weekdays}]
 */

// DONE add capacity

// DONE get staffId from logged in user

exports.getCourseGroups = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const staffId = req.user.id;

  const courseGroups = await CourseGroup.findAll({
    attributes: ["id"],
    include: {
      model: Center,
      as: "center",
      attributes: [],
      required: true,
      include: {
        model: StaffCenter,
        as: "staffCenters",
        attributes: [],
        required: true,
        where: {
          staffId: staffId,
        },
      },
    },
    raw: true,
  });

  const courseGroupsIds = courseGroups.map((el) => el.id);

  const { count, rows } = await CourseGroup.findAndCountAll({
    attributes: [
      "id",
      "weekDays",
      "capacity",
      [Sequelize.col("course->tutor.first_name"), "tutor.firstName"],
      [Sequelize.col("course->tutor.id"), "tutor.id"],
      [Sequelize.col("course->tutor.last_name"), "tutor.lastName"],
      [Sequelize.col("course->tutor.has_image"), "tutor.hasImage"],
      [Sequelize.col("course->subject.name"), "subject"],
      [
        Sequelize.literal(
          "(SELECT COUNT(DISTINCT(`student_id`)) FROM attendance INNER JOIN course_group_session ON attendance.course_group_session_id = course_group_session.id WHERE course_group_session.course_group_id = `CourseGroup`.`id`)"
        ),
        "numberOfStudents",
      ],
    ],
    include: {
      model: Course,
      as: "course",
      attributes: ["id", "grade", "education"],
      include: [
        {
          model: Subject,
          as: "subject",
          attributes: [],
        },
        {
          model: Tutor,
          as: "tutor",
          attributes: [],
        },
      ],
    },
    where: {
      id: courseGroupsIds,
    },
    offset: offset,
    limit: limit,
    raw: true,
    nest: true,
    subQuery: false,
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

/**
 * Get Students:
 * URL: /coursegroup/{courseGroupId}/students
 * Method: GET
 * Response: [{ id, hasImage, studentName, phone}]
 */

// TODO get staffId from logged in user and make sure he has access to the courseGroup

exports.getCourseGroupStudents = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { courseGroupId } = req.params;

  const { count, rows } = await Student.findAndCountAll({
    attributes: [
      "id",
      "hasImage",
      "firstName",
      "lastName",
      "phone",
      "countryCode",
    ],
    include: {
      model: Attendance,
      as: "attendances",
      attributes: [],
      required: true,
      include: {
        model: CourseGroupSession,
        as: "courseGroupSession",
        attributes: [],
        required: true,
        where: {
          courseGroupId: courseGroupId,
        },
      },
    },
    offset: offset,
    limit: limit,
    subQuery: false,
    distinct: true,
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

/**
 * Get Course Group Sessions
 * URL: coursegroup/{courseGroupId}/sessions
 * Method: GET
 * Response: [{from, to, date, id}]
 */

// TODO get staffId from logged in user and make sure he has access to the courseGroup

exports.getCourseGroupSessions = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { courseGroupId } = req.params;

  const startDate = req.query.from;
  const endDate = req.query.to;

  let { count, rows } = await CourseGroupSession.findAndCountAll({
    attributes: ["id", "from", "to", "date"],
    where: {
      course_group_id: courseGroupId,
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
    order: [
      [
        Sequelize.cast(
          Sequelize.fn(
            "concat",
            Sequelize.col("date"),
            "T",
            Sequelize.col("from")
          ),
          "DATETIME"
        ),
        "DESC",
      ],
    ],
    include: {
      model: Lecture,
      as: "lecture",
      attributes: ["title", "id"],
    },
    offset: offset,
    limit: limit,
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

exports.changePassword = catchAsync(async (req, res, next) => {
  const staffId = req.user.id;

  const staff = await Staff.findByPk(staffId);

  const isMatch = await bcrypt.compare(
    req.body.oldPassword,
    staff.password.toString()
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

  await Staff.update(
    { password },
    {
      where: {
        id: staffId,
      },
      fields: ["password"],
    }
  );

  res.status(200).end();
});

exports.migrateOrderItem = catchAsync(async (req, res, next) => {
  const { orderItemId } = req.params;
  const { sessionId } = req.body;

  await sequelize.transaction(async (transaction) => {
    const orderItem = await OrderItem.findByPk(orderItemId, {
      include: {
        model: Order,
        as: "order",
        attributes: ["studentId"],
      },
      transaction,
    });

    const studentId = orderItem.order.studentId;
    const oldSessionId = orderItem.courseGroupSessionId;

    orderItem.courseGroupSessionId = sessionId;
    await orderItem.save({ transaction });

    await Attendance.update(
      { courseGroupSessionId: sessionId, attended: AttendanceTypes.ABSENT },
      {
        where: {
          studentId,
          courseGroupSessionId: oldSessionId,
        },
        transaction,
      }
    );
  });

  res.status(200).send();
});
