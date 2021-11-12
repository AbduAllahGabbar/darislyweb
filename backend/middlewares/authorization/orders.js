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
  Order,
} = require("../../models");
const { UserRoles } = require("../../enums/index");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const authTutorToOrder = async (orderId, tutorId) => {
  const orderItem = await OrderItem.findOne({
    include: {
      model: CourseGroupSession,
      as: "courseGroupSession",
      required: true,
      include: {
        model: CourseGroup,
        as: "courseGroup",
        required: true,
        include: {
          model: Course,
          as: "course",
          required: true,
          include: {
            model: Tutor,
            as: "tutor",
            required: true,
            where: tutorId,
          },
        },
      },
    },
    where: {
      orderId,
    },
  });

  if (!orderItem)
    throw new AppError("You do not have access to this order", 401);
};

const authStaffToOrder = async (orderId, staffId) => {
  const order = await Order.findOne({
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
      id: orderId,
    },
  });

  if (!order) throw new AppError("You do not have access to this order", 401);
};

const authStudentToOrder = async (orderId, studentId) => {
  const order = await Order.findOne({
    where: {
      id: orderId,
      studentId,
    },
  });

  if (!order) throw new AppError("You do not have access to this order", 401);
};

exports.authorizeUserToOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.id;
  const role = req.user.dataValues.role;

  switch (role) {
    case UserRoles.STUDENT:
      await authStudentToOrder(orderId, userId);
      break;
    case UserRoles.TUTOR:
      await authTutorToOrder(orderId, userId);
      break;
    case UserRoles.STAFF:
      // await authStaffToOrder(orderId, userId);
      break;
    default:
      throw new AppError("Invalid user role for authorization", 500);
  }

  next();
});
