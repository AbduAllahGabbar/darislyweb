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

const authTutorToOwnedCourseGroup = async (courseGroupId, tutorId) => {
  const courseGroup = await CourseGroup.findOne({
    include: {
      required: true,
      model: Course,
      as: "course",
    },
    where: {
      id: courseGroupId,
    },
  });

  if (courseGroup.course.tutorId !== tutorId)
    throw new AppError("You do not have access to this course group", 401);
};

const authStaffToOwnedCourseGroup = async (courseGroupId, staffId) => {
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
      id: courseGroupId,
    },
  });

  if (!courseGroup)
    throw new AppError("You do not have access to this course group", 401);
};

const authStudentToEnrolledCourseGroup = async (courseGroupId, studentId) => {
  const attendance = await Attendance.findOne({
    include: {
      model: CourseGroupSession,
      as: "courseGroupSession",
      required: true,
      where: {
        courseGroupId,
      },
    },
    where: {
      studentId,
    },
  });

  if (!attendance)
    throw new AppError("You do not have access to this course group", 401);
};

exports.authorizeUserToCourseGroup = catchAsync(async (req, res, next) => {
  const { courseGroupId } = req.params;
  const userId = req.user.id;
  const role = req.user.dataValues.role;

  switch (role) {
    case UserRoles.STUDENT:
      await authStudentToEnrolledCourseGroup(courseGroupId, userId);
      break;
    case UserRoles.TUTOR:
      await authTutorToOwnedCourseGroup(courseGroupId, userId);
      break;
    case UserRoles.STAFF:
      await authStaffToOwnedCourseGroup(courseGroupId, userId);
      break;
    default:
      throw new AppError("Invalid user role for authorization", 500);
  }

  next();
});
