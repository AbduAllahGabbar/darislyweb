const {
  Attendance,
  Course,
  CourseGroup,
  CourseGroupSession,
  Center,
  StaffCenter,
} = require("../../models");
const { UserRoles } = require("../../enums/index");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const authTutorToOwnedCourse = async (courseId, tutorId) => {
  const course = await Course.findByPk(courseId);

  if (course.tutorId !== tutorId)
    throw new AppError("You do not have access to this course", 401);
};

const authStaffToOwnedCourse = async (courseId, staffId) => {
  const courseGroup = await CourseGroup.findOne({
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
    where: {
      courseId,
    },
  });

  if (!courseGroup)
    throw new AppError("You do not have access to this course", 401);
};

const authStudentToEnrolledCourse = async (courseId, studentId) => {
  const attendance = await Attendance.findOne({
    include: {
      model: CourseGroupSession,
      as: "courseGroupSession",
      required: true,
      include: {
        model: CourseGroup,
        as: "courseGroup",
        required: true,
        where: {
          courseId,
        },
      },
    },
    where: {
      studentId,
    },
  });

  if (!attendance)
    throw new AppError("You do not have access to this course", 401);
};

exports.authorizeUserToCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.user.id;
  const role = req.user.dataValues.role;

  switch (role) {
    case UserRoles.STUDENT:
      await authStudentToEnrolledCourse(courseId, userId);
      break;
    case UserRoles.TUTOR:
      await authTutorToOwnedCourse(courseId, userId);
      break;
    case UserRoles.STAFF:
      await authStaffToOwnedCourse(courseId, userId);
      break;
    default:
      throw new AppError("Invalid user role for authorization", 500);
  }

  next();
});
