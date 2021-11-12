const catchAsync = require("../../utils/catchAsync");
const {
  Announcement,
  Notification,
  Student,
  Attendance,
  CourseGroupSession,
  CourseGroup,
} = require("../../models");
const Sequelize = require("sequelize");
const createPaginationObject = require("../../utils/createPaginationObject");
const { NotificationTypes } = require("../../enums/index");

exports.getStudentNotifications = catchAsync(async (req, res, next) => {
  const studentId = req.user.id;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { count, rows } = await Notification.findAndCountAll({
    where: {
      studentId: studentId,
    },
    attributes: ["id", "read", "type", "content", "createdAt"],
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

exports.readNotifications = catchAsync(async (req, res, next) => {
  const notificationsIds = req.body.notifications;

  await Notification.update(
    { read: 1 },
    {
      where: {
        id: notificationsIds,
      },
    }
  );

  res.status(200).send();
});
