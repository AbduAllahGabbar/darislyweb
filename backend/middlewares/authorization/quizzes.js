const {
  Attendance,
  Course,
  CourseGroup,
  CourseGroupSession,
  Lecture,
  Center,
  StaffCenter,
  OrderItem,
  Tutor,
  Quiz,
  Order,
} = require("../../models");
const { UserRoles } = require("../../enums/index");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const authTutorToQuiz = async (quizId, tutorId) => {
  const quiz = await Quiz.findOne({
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
    where: {
      id: quizId,
    },
  });

  if (!quiz) throw new AppError("You do not have access to this quiz", 401);
};

const authStaffToQuiz = async (quizId, staffId) => {
  const quiz = await Quiz.findOne({
    include: {
      model: Lecture,
      as: "lecture",
      required: true,
      include: {
        model: Course,
        as: "course",
        required: true,
        include: {
          model: CourseGroup,
          as: "courseGroups",
          required: true,
          include: {
            model: Center,
            as: "center",
            required: true,
            include: {
              model: StaffCenter,
              as: "staffCenters",
              required: true,
              where: {
                staffId,
              },
            },
          },
        },
      },
    },
    where: {
      id: quizId,
    },
  });

  if (!quiz) throw new AppError("You do not have access to this quiz", 401);
};

const authStudentToQuiz = async (quizId, studentId) => {
  const quiz = await Quiz.findOne({
    include: {
      model: Lecture,
      as: "lecture",
      required: true,
      include: {
        model: CourseGroupSession,
        as: "courseGroupSession",
        required: true,
        include: {
          model: Attendance,
          as: "attendances",
          required: true,
          where: {
            studentId,
          },
        },
      },
    },
    where: {
      id: quizId,
    },
  });

  if (!quiz) throw new AppError("You do not have access to this quiz", 401);
};

exports.authorizeUserToQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const userId = req.user.id;
  const role = req.user.dataValues.role;

  switch (role) {
    case UserRoles.STUDENT:
      await authStudentToQuiz(quizId, userId);
      break;
    case UserRoles.TUTOR:
      await authTutorToQuiz(quizId, userId);
      break;
    case UserRoles.STAFF:
      await authStaffToQuiz(quizId, userId);
      break;
    default:
      throw new AppError("Invalid user role for authorization", 500);
  }

  next();
});
