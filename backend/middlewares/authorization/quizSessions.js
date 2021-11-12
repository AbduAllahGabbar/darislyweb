const {
  Attendance,
  Course,
  CourseGroupSession,
  Lecture,
  Quiz,
  QuizSession,
} = require("../../models");
const { UserRoles } = require("../../enums/index");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const authStudentToQuizSession = async (quizSessionId, studentId) => {
  const quizSession = await QuizSession.findOne({
    include: {
      model: Quiz,
      as: "quiz",
      required: true,
      attributes: [],
      include: {
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
    },
    where: {
      id: quizSessionId,
    },
  });

  if (!quizSession)
    throw new AppError("You do not have access to this quiz", 401);
};

const authTutorToQuizSession = async (quizSessionId, tutorId) => {
  const quizSession = await QuizSession.findOne({
    include: {
      model: Quiz,
      as: "quiz",
      required: true,
      include: {
        model: Lecture,
        as: "lecture",
        required: true,
        include: {
          model: Course,
          as: "course",
          required: true,
          where: {
            tutorId,
          },
        },
      },
    },
    where: {
      id: quizSessionId,
    },
  });

  if (!quizSession)
    throw new AppError("You do not have access to this quiz", 401);
};

exports.authorizeUserToQuizSession = catchAsync(async (req, res, next) => {
  const { quizSessionId } = req.params;
  const userId = req.user.id;
  const role = req.user.dataValues.role;

  switch (role) {
    case UserRoles.STUDENT:
      await authStudentToQuizSession(quizSessionId, userId);
      break;
    case UserRoles.TUTOR:
      await authTutorToQuizSession(quizSessionId, userId);
      break;
    default:
      throw new AppError("Invalid user role for authorization", 500);
  }

  next();
});
