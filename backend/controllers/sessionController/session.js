const {
  Attendance,
  Course,
  CourseGroupSession,
  Student,
  Subject,
  OrderItem,
  Order,
  CourseGroupSessionSchedule,
  Lecture,
} = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const createPaginationObject = require("../../utils/createPaginationObject");
const AppError = require("../../utils/appError");
const Sequelize = require("sequelize");
const CryptoJS = require("crypto-js");

/**
 * addAttendance
 * URL: courses/{courseId}/sessions/{sessionId}/attendance
 * Method: PUT
 * Body: attendance: [{studentId, status}]
 * Response: OK
 */

// TODO add validation on tutorId

exports.addAttendance = catchAsync(async (req, res, next) => {
  let { attendance } = req.body;
  const { courseGroupSessionId } = req.params;

  attendance.map((el) => {
    el.courseGroupSessionId = courseGroupSessionId;
  });

  await Attendance.bulkCreate(attendance, {
    fields: ["studentId", "attended", "courseGroupSessionId"],
    updateOnDuplicate: ["attended"],
  });

  res.status(200).end();
});

/**
 * Get Course Group Session Attendance
 * URL: /coursegroup/:courseGroupSessionId/attendance
 * Method: GET
 * Response: { students: [{ id, name, attended}] }
 */

exports.getCourseGroupSessionAttendance = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { courseGroupSessionId } = req.params;

  const { count, rows } = await Attendance.findAndCountAll({
    attributes: ["attended"],
    include: {
      model: Student,
      as: "student",
      required: true,
      attributes: ["id", "firstName", "lastName", "hasImage"],
    },
    where: {
      courseGroupSessionId: courseGroupSessionId,
    },
    order: [
      [
        Sequelize.fn(
          "concat",
          Sequelize.col("student.first_name"),
          Sequelize.col("student.last_name")
        ),
        "ASC",
      ],
    ],
    offset: offset,
    limit: limit,
    subQuery: false,
    raw: true,
    nest: true,
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

// TODO send announcements to all students with the change

exports.patchSession = catchAsync(async (req, res, next) => {
  const { sessionId } = req.params;

  await CourseGroupSession.update(req.body, {
    fields: ["lectureId", "from", "to", "date"],
    validate: true,
    where: {
      id: sessionId,
    },
  });

  res.status(200).send();
});

exports.getSession = catchAsync(async (req, res, next) => {
  const { courseGroupSessionId } = req.params;
  const studentId = req.user.id;

  const session = await CourseGroupSession.findByPk(courseGroupSessionId, {
    include: [
      {
        model: Lecture,
        as: "lecture",
        attributes: ["id", "title", "videoUrl"],
        include: {
          model: Course,
          as: "course",
          attributes: ["id", "description"],
          include: {
            model: Subject,
            as: "subject",
            attributes: ["name"],
          },
        },
      },
      {
        model: CourseGroupSessionSchedule,
        as: "courseGroupSessionSchedules",
        attributes: ["from", "to"],
        where: {
          studentId,
        },
        required: false,
      },
      {
        model: Attendance,
        as: "attendances",
        attributes: ["attended", "type"],
        where: {
          studentId,
          courseGroupSessionId,
        },
        required: false,
      },
    ],
    attributes: ["id", "from", "to", "date"],
  });

  if (!session) throw new AppError("No session found with that id", 404);

  const sessionObject = session.toJSON();

  sessionObject.attendances = sessionObject.attendances
    ? sessionObject.attendances[0]
    : undefined;

  sessionObject.from = `${sessionObject.date}T${sessionObject.from}+02:00`;
  sessionObject.to = `${sessionObject.date}T${sessionObject.to}+02:00`;
  sessionObject.duration = (process.env.LECTURE_DURATION / 3600000).toString();
  sessionObject.date = undefined;

  const schedules = sessionObject.courseGroupSessionSchedules;

  if (schedules.length > 0) {
    sessionObject.from = schedules[0].from;
    sessionObject.to = schedules[0].to;
  }

  sessionObject.courseGroupSessionSchedules = undefined;

  sessionObject.lecture.course.subject =
    sessionObject.lecture.course.subject.name;
  sessionObject.course = sessionObject.lecture.course;
  sessionObject.lecture.course = undefined;

  sessionObject.lecture.videoUrl = sessionObject.lecture.videoUrl
    ? CryptoJS.AES.decrypt(
        sessionObject.lecture.videoUrl.toString(),
        process.env.ZOOM_SECRET_STRING
      ).toString(CryptoJS.enc.Utf8)
    : null;

  res.status(200).json(sessionObject);
});

exports.addSessionSchedule = catchAsync(async (req, res, next) => {
  const { courseGroupSessionId } = req.params;
  const studentId = req.user.id;

  const duration = process.env.LECTURE_DURATION * 1 || 1000 * 60 * 60 * 2;

  const from = new Date();
  const to = new Date(from.getTime() + duration);

  const scheduleObject = {
    courseGroupSessionId,
    studentId,
    from,
    to,
  };

  await CourseGroupSessionSchedule.create(scheduleObject, {
    validate: true,
    updateOnDuplicate: ["from", "to"],
  });

  res.status(200).send();
});

exports.getStudentSessionAttendance = catchAsync(async (req, res, next) => {
  const studentId = req.user.id;
  const { courseGroupSessionId } = req.params;

  const attendance = await Attendance.findOne({
    where: {
      studentId,
      courseGroupSessionId,
    },
    attributes: ["studentId", "courseGroupSessionId", "attended", "type"],
  });

  if (!attendance)
    throw new AppError("No attendance was found for that session", 404);

  res.status(200).json(attendance);
});
