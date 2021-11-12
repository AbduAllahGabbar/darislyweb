const express = require("express");
const validation = require("../middlewares/validation");
const restrictTo = require("../middlewares/restrictTo");
const { OrderStatusTypes, AttendanceTypes } = require("../enums/index");
const { OrderItem, Order, Attendance } = require("../models");

const router = express.Router();

router.route("/fixStudentsOrders").get(async (req, res, next) => {
  const existingAttendance = await Attendance.findAll({
    raw: true,
    nest: true,
  });

  const orderItems = await OrderItem.findAll({
    include: {
      model: Order,
      as: "order",
      where: {
        status: OrderStatusTypes.CONFIRMED,
      },
      required: true,
    },
  });

  const newAttendance = [];

  orderItems.forEach((orderItem) => {
    let found = false;

    existingAttendance.forEach((el) => {
      if (
        el.studentId == orderItem.order.studentId &&
        el.courseGroupSessionId == orderItem.courseGroupSessionId
      )
        found = true;
    });

    if (!found)
      newAttendance.push({
        studentId: orderItem.order.studentId,
        courseGroupSessionId: orderItem.courseGroupSessionId,
        attended: AttendanceTypes.ABSENT,
        type: orderItem.type,
      });
  });

  await Attendance.bulkCreate(newAttendance, {
    validate: true,
    fields: ["studentId", "courseGroupSessionId", "attended", "type"],
  });

  res.status(200).send();
});

module.exports = router;
