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

const authTutorToOwnedCourseGroupSession = async (
  courseGroupSessionId,
  tutorId
) => {
  const courseGroupSession = await CourseGroupSession.findOne({
    include: {
      required: true,
      model: CourseGroup,
      as: "courseGroup",
      include: {
        required: true,
        model: Course,
        as: "course",
      },
    },
    where: {
      id: courseGroupSessionId,
    },
  });

  if (courseGroupSession.courseGroup.course.tutorId !== tutorId)
    throw new AppError(
      "You do not have access to this course group session",
      401
    );
};

const authStaffToOwnedCourseGroupSession = async (
  courseGroupSessionId,
  staffId
) => {
  const courseGroupSession = await CourseGroupSession.findOne({
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
    where: {
      id: courseGroupSessionId,
    },
  });

  if (!courseGroupSession)
    throw new AppError(
      "You do not have access to this course group session",
      401
    );
};

const authStudentToEnrolledCourseGroupSession = async (
  courseGroupSessionId,
  studentId
) => {
  const attendance = await Attendance.findOne({
    where: {
      studentId,
      courseGroupSessionId,
    },
  });

  if (!attendance)
    throw new AppError(
      "You do not have access to this course group session",
      401
    );
};

exports.authorizeUserToCourseGroupSession = catchAsync(
  async (req, res, next) => {
    const { courseGroupSessionId } = req.params;
    const userId = req.user.id;
    const role = req.user.dataValues.role;

    switch (role) {
      case UserRoles.STUDENT:
        await authStudentToEnrolledCourseGroupSession(
          courseGroupSessionId,
          userId
        );
        break;
      case UserRoles.TUTOR:
        await authTutorToOwnedCourseGroupSession(courseGroupSessionId, userId);
        break;
      case UserRoles.STAFF:
        await authStaffToOwnedCourseGroupSession(courseGroupSessionId, userId);
        break;
      default:
        throw new AppError("Invalid user role for authorization", 500);
    }

    next();
  }
);
