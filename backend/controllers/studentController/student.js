const {
  Student,
  Order,
  OrderItem,
  CourseGroupSession,
  CourseGroupSessionSchedule,
  CourseGroup,
  Course,
  Subject,
  Tutor,
  Attendance,
  Lecture,
  Quiz,
  QuizSession,
  QuizAnswer,
  CreditCard,
  sequelize,
} = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const acceptsdk = require("../../services/accept");
const bcrypt = require("bcryptjs");
const errors = require("../../utils/errors");
const { AttendanceTypes } = require("../../enums/index");

/**
 * URL: /students/settings
 * Method: PATCH
 * Body: { firstName, lastName, email, phone, country, countryCode, address, grade, educationSystem, city, area}
 * Response: OK
 */

// DONE retrieve studentId from logged in user
// TODO add city,area,address

exports.patchStudent = catchAsync(async (req, res, next) => {
  const studentId = req.user.id;

  await Student.update(req.body, {
    where: {
      id: studentId,
    },
    fields: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "countryCode",
      "address",
      "grade",
      "education",
      "cityId",
      "areaId",
    ],
  });

  res.status(200).end();
});

/**
 * URL: students/stats
 * Method: GET
 * Response: { coursesCompleted, coursesInProgress, quizzesCompleted, quizzesInProgress, coursesProgress: [ {subject, progress}, ...]}
 */

exports.getCourseStats = catchAsync(async (req, res, next) => {
  const studentId = req.user.id;

  const enrolledCourses = await Course.findAll({
    include: [
      {
        model: Tutor,
        as: "tutor",
        attributes: ["id", "firstName", "lastName"],
      },
      { model: Subject, as: "subject" },
      {
        model: CourseGroup,
        as: "courseGroups",
        required: true,
        include: {
          model: CourseGroupSession,
          as: "courseGroupSessions",
          required: true,
          include: {
            model: Attendance,
            as: "attendances",
            where: { studentId: req.user.id },
            attributes: { exclude: ["courseGroupSessionId", "studentId"] },
            required: true,
          },
        },
      },
    ],
  });

  const enrolledQuizzes = await Quiz.findAll({
    attributes: ["id"],
    include: [
      {
        model: Lecture,
        as: "lecture",
        required: true,
        attributes: [],
        include: {
          model: CourseGroupSession,
          as: "courseGroupSession",
          required: true,
          attributes: [],
          include: {
            model: Attendance,
            as: "attendances",
            required: true,
            attributes: [],
            where: {
              studentId,
            },
          },
        },
      },
      {
        model: QuizSession,
        as: "quizSessions",
        required: true,
        include: {
          model: QuizAnswer,
          as: "quizAnswers",
          where: {
            studentId,
          },
          required: false,
        },
      },
    ],
  });

  let quizzesCompleted = 0;
  let quizzesInProgress = 0;

  enrolledQuizzes.forEach((quiz) => {
    quiz = quiz.toJSON();
    let answeredQuiz = false;
    quiz.quizSessions.forEach((session) => {
      if (session.quizAnswers) answeredQuiz |= true;
    });

    if (answeredQuiz) quizzesCompleted++;
    else quizzesInProgress++;
  });

  let coursesCompleted = 0;
  let coursesInProgress = 0;
  let totalSessions = 0;
  let attendedSessions = 0;
  let courses = [];

  enrolledCourses.forEach((course) => {
    totalSessions = 0;
    attendedSessions = 0;
    course.courseGroups.forEach((group) => {
      totalSessions = group.courseGroupSessions.length;
      attendedSessions = group.courseGroupSessions.filter(
        (session) =>
          session.attendances[0].attended === AttendanceTypes.PRESENT ||
          session.attendances[0].attended === AttendanceTypes.LATE ||
          session.attendances[0].attended === AttendanceTypes.EXCUSED
      ).length;
    });
    if (attendedSessions < totalSessions) coursesInProgress += 1;
    else coursesCompleted += 1;
    courses.push({
      id: course.id,
      subject: course.subject.name,
      tutor: {
        firstName: course.tutor.firstName,
        lastName: course.tutor.lastName,
      },
      attendedSessions,
      totalSessions,
    });
  });

  res
    .json({
      courses,
      coursesCompleted,
      coursesInProgress,
      quizzesCompleted,
      quizzesInProgress,
    })
    .end();
});

/**
 * URL: /calendarsessions
 * Method: GET
 * Response: {sessions: [{ tutorName, subject, type, date, from, to, id}, ...]}
 */

// DONE retrieve studentId from logged in user

exports.getCalendarSessions = catchAsync(async (req, res, next) => {
  const studentId = req.user.id;
  const calendar = await Attendance.findAll({
    where: {
      studentId: studentId,
    },
    include: {
      model: CourseGroupSession,
      as: "courseGroupSession",
      required: true,
      include: [
        {
          model: CourseGroup,
          attributes: ["id"],
          as: "courseGroup",
          required: true,
          include: {
            model: Course,
            as: "course",
            required: true,
            include: [
              {
                model: Subject,
                as: "subject",
                required: false,
              },
              {
                model: Tutor,
                attributes: ["firstName", "lastName"],
                as: "tutor",
                required: false,
              },
            ],
          },
        },
        {
          model: CourseGroupSessionSchedule,
          as: "courseGroupSessionSchedules",
          required: false,
          where: {
            studentId,
          },
        },
        {
          model: Lecture,
          as: "lecture",
          attributes: ["title"],
        },
        {
          model: Lecture,
          as: "lecture",
          attributes: ["title"],
        },
      ],
    },
    group: ["courseGroupSession.id"],
  });

  // reformat the response

  const sessions = [];
  calendar.forEach((el) => {
    el = el.toJSON();
    session = {};
    session.tutor = el.courseGroupSession.courseGroup.course.tutor;
    session.subject = el.courseGroupSession.courseGroup.course.subject;
    session.lecture = el.courseGroupSession.lecture;

    if (el.courseGroupSession.courseGroupSessionSchedules.length > 0) {
      session.from = el.courseGroupSession.courseGroupSessionSchedules[0].from;
      session.to = el.courseGroupSession.courseGroupSessionSchedules[0].to;
    } else {
      session.from = `${el.courseGroupSession.date}T${el.courseGroupSession.from}+02:00`;
      session.to = `${el.courseGroupSession.date}T${el.courseGroupSession.to}+02:00`;
    }

    session.id = el.courseGroupSession.id;
    session.type = el.type;
    session.attendance = {
      attended: el.attended,
      type: el.type,
    };
    sessions.push(session);
  });

  res.status(200).json(sessions);
});

exports.getCourses = catchAsync(async (req, res, next) => {
  const enrolledCourses = await Course.findAll({
    include: [
      {
        model: Tutor,
        as: "tutor",
        attributes: ["id", "firstName", "lastName"],
      },
      { model: Subject, as: "subject" },
      {
        model: CourseGroup,
        as: "courseGroups",
        required: true,
        include: {
          model: CourseGroupSession,
          as: "courseGroupSessions",
          required: true,
          include: {
            model: Attendance,
            as: "attendances",
            where: { studentId: req.user.id },
            attributes: { exclude: ["courseGroupSessionId", "studentId"] },
            required: true,
          },
        },
      },
    ],
  });

  let totalSessions = 0;
  let attendedSessions = 0;
  let courses = [];

  enrolledCourses.forEach((course) => {
    totalSessions = 0;
    attendedSessions = 0;
    course.courseGroups.forEach((group) => {
      totalSessions = group.courseGroupSessions.length;
      attendedSessions = group.courseGroupSessions.filter(
        (session) =>
          session.attendances[0].attended === AttendanceTypes.PRESENT ||
          session.attendances[0].attended === AttendanceTypes.LATE ||
          session.attendances[0].attended === AttendanceTypes.EXCUSED
      ).length;
    });
    courses.push({
      id: course.id,
      type: course.type,
      subject: course.subject.name,
      tutor: {
        firstName: course.tutor.firstName,
        lastName: course.tutor.lastName,
      },
      attendedSessions,
      totalSessions,
    });
  });

  res.json(courses).end();
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const studentId = req.user.id;

  const student = await Student.findByPk(studentId);

  if (student.password) {
    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      student.password.toString()
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
  }

  const password = await bcrypt.hash(req.body.newPassword, 10);

  await Student.update(
    { password },
    {
      where: {
        id: studentId,
      },
      fields: ["password"],
    }
  );

  res.status(200).end();
});

exports.addAttendance = async (req, res, next) => {
  const { courseGroupSessionId } = req.params;
  const studentId = req.user.id;

  await Attendance.upsert(
    {
      studentId,
      courseGroupSessionId,
      attended: AttendanceTypes.PRESENT,
    },
    {
      fields: ["studentId", "attended", "courseGroupSessionId"],
      updateOnDuplicate: ["attended"],
    }
  );

  res.status(200).send();
};
