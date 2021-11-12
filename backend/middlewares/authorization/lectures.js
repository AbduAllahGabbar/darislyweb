const {
  Attendance,
  Course,
  CourseGroup,
  CourseGroupSession,
  Lecture,
  Center,
  StaffCenter,
} = require("../../models");
const { UserRoles } = require("../../enums/index");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const authTutorToOwnedLecture = async (lectureId, tutorId) => {
  const lecture = await Lecture.findOne({
    include: {
      model: CourseGroupSession,
      as: "courseGroupSession",
      required: true,
      include: {
        required: true,
        model: CourseGroup,
        as: "courseGroup",
        include: {
          required: true,
          model: Course,
          as: "course",
          where: {
            tutorId,
          },
        },
      },
    },
    where: {
      id: lectureId,
    },
  });

  if (!lecture)
    throw new AppError("You do not have access to this lecture", 401);
};

const authStaffToOwnedLecture = async (lectureId, staffId) => {
  const lecture = await Lecture.findOne({
    include: {
      model: Course,
      as: "course",
      required: true,
      include: {
        model: CourseGroup,
        as: "courseGroup",
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
    where: {
      id: lectureId,
    },
  });

  if (!lecture)
    throw new AppError("You do not have access to this lecture", 401);
};

const authStudentToEnrolledLecture = async (lectureId, studentId) => {
  const attendance = await Attendance.findOne({
    include: {
      model: Lecture,
      as: "lecture",
      where: {
        lectureId,
      },
      required: true,
    },
    where: {
      studentId,
    },
  });

  if (!attendance)
    throw new AppError("You do not have access to this lecture", 401);
};

exports.authorizeUserToLecture = catchAsync(async (req, res, next) => {
  const { lectureId } = req.params;
  const userId = req.user.id;
  const role = req.user.dataValues.role;

  switch (role) {
    case UserRoles.STUDENT:
      await authStudentToEnrolledLecture(lectureId, userId);
      break;
    case UserRoles.TUTOR:
      await authTutorToOwnedLecture(lectureId, userId);
      break;
    case UserRoles.STAFF:
      await authStaffToOwnedLecture(lectureId, userId);
      break;
    default:
      throw new AppError("Invalid user role for authorization", 500);
  }

  next();
});
