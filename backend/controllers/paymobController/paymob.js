const accept = require("../../services/accept");
const confirmOrder = require("../../controllers/orderController/order")
  .confirmOrder;
const catchAsync = require("../../utils/catchAsync");
const _ = require("lodash");

const {
  Student,
  CreditCard,
  Order,
  OrderItem,
  sequelize,
} = require("../../models");

exports.notificationCallback = catchAsync(async (req, res, next) => {
  if (!accept.checkHMAC(req)) {
    console.log("HMAC ERROR");

    throw {
      type: "AUTHENTICATION_ERROR",
      msg: "This message was not sent by accept (notification)",
    };
  }

  if (req.body.type == "TOKEN") {
    await sequelize.transaction(async (transaction) => {
      let creditCard = await CreditCard.findOne({
        where: { orderId: req.body.obj.order_id },
      });

      if (creditCard) {
        studentId = creditCard.studentId;
        creditCard.cardToken = req.body.obj.token;
        creditCard.maskedPan = req.body.obj.masked_pan;
        creditCard.subtype = req.body.obj.card_subtype;
        creditCard.createdAt = req.body.obj.created_at;
      } else {
        let order = await Order.findOne({
          where: { acceptOrderId: req.body.obj.order_id },
          include: {
            model: Student,
            as: "student",
            attributes: ["id"],
          },
        });

        studentId = order.student.id;

        creditCard = await CreditCard.create(
          {
            studentId: order.student.id,
            cardToken: req.body.obj.token,
            maskedPan: req.body.obj.masked_pan,
            subtype: req.body.obj.card_subtype,
            verified: 1,
            createdAt: req.body.obj.created_at,
            orderId: req.body.obj.order_id,
          },
          { transaction }
        );
      }

      if (creditCard) await creditCard.save({ transaction });
    });
  } else {
    console.log("PAYMENT VERIFIED");
  }

  res.end();
});

exports.processCallBack = catchAsync(async (req, res, next) => {
  let order, creditCard;

  if (!accept.checkHMAC(req)) {
    console.log("HMAC ERROR");

    throw {
      type: "AUTHENTICATION_ERROR",
      msg: "This message was not sent by accept (process)",
    };
  }

  const approved = req.query["data.message"] == "Approved";
  const orderId = req.query.order;
  await sequelize.transaction(async (transaction) => {
    [creditCard, order] = await Promise.all([
      CreditCard.findOne(
        {
          where: { orderId },
          attributes: ["id", "cardToken", "maskedPan", "subtype"],
        },
        { transaction }
      ),
      Order.findOne(
        {
          where: { acceptOrderId: orderId },
          attributes: ["id", "studentId", "acceptOrderId"],
          include: {
            model: OrderItem,
            as: "orderItems",
          },
        },
        { transaction }
      ),
    ]);

    if (creditCard && !order) {
      if (approved) {
        creditCard.verified = 1;
        await creditCard.save({ transaction });
      } else {
        await CreditCard.destroy(
          {
            where: {
              id: creditCard.id,
            },
          },
          { transaction }
        );
      }

      const response = JSON.stringify({
        status: approved ? "success" : "error",
        data: _.omit(creditCard.dataValues, "id"),
      });

      // window.ReactNativeWebView.postMessage('${response}')

      res.redirect("http://localhost:3000");
      // res
      //   .send(
      //     `<script>
      //       window.postMessage('${response}')
      //     </script>`
      //   )
      //   .end();
    }
    if (order) {
      const amountPaid = req.query["amount_cents"] / 100;

      order.verified = 1;

      await confirmOrder({ order, transaction });

      const response = JSON.stringify({
        status: approved ? "success" : "error",
        data: amountPaid,
      });

      res
        .send(
          `<script>
              window.ReactNativeWebView.postMessage('${response}')
            </script>`
        )
        .end();
    }
  });
});
