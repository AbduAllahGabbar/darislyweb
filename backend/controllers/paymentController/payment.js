const Sequelize = require("sequelize");
const { sequelize } = require("../../models");
const { Order } = require("../../models");
const CryptoJS = require("crypto-js");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const {
  OrderTypes,
  FawryOrderStatus,
  OrderStatusTypes,
} = require("../../enums");
const { confirmOrder } = require("../orderController/order");

exports.paymentSuccess = catchAsync(async (req, res, next) => {
  // const chargeResponse = JSON.parse(req.query.chargeResponse);

  // await sequelize.transaction(async (transaction) => {
  //   const order = await Order.findOne({
  //     where: { token: chargeResponse.merchantRefNumber },
  //     transaction,
  //   });

  //   order.fawryReferenceNumber = chargeResponse.fawryRefNumber;
  //   order.type =
  //     chargeResponse.paymentMethod === "PAYATFAWRY"
  //       ? OrderTypes.FAWRY_CASH
  //       : OrderTypes.CREDIT;
  //   await confirmOrder(order, transaction);
  // });

  res
    .send(
      `<script>
            window.parent.location.replace("${process.env.WEB_APP_URL}");
        </script>`
    )
    .end();
});

exports.paymentFail = catchAsync(async (req, res, next) => {
  res
    .send(
      `<script>
            window.parent.location.replace("${process.env.WEB_APP_URL}");
        </script>`
    )
    .end();
});

exports.paymentNotificationV1 = catchAsync(async (req, res, next) => {
  console.log(
    "--------------------- Payment Notification Response ---------------------"
  );

  console.log("req.query");
  console.log(req.query);

  res.end();
});

exports.paymentNotificationV2 = catchAsync(async (req, res, next) => {
  console.log(
    "--------------------- Payment Notification Response ---------------------"
  );

  console.log("req.body");
  console.log(req.body);

  await sequelize.transaction(async (transaction) => {
    const paymentResponse = req.body;
    const orderStatus = paymentResponse.orderStatus.trim().toLowerCase();

    const order = await Order.findOne({
      where: { token: paymentResponse.merchantRefNumber },
      transaction,
    });

    switch (orderStatus) {
      case FawryOrderStatus.NEW: {
        console.log(FawryOrderStatus.NEW);
        order.fawryReferenceNumber = paymentResponse.fawryRefNumber;
        order.type =
          paymentResponse.paymentMethod === "PAYATFAWRY"
            ? OrderTypes.FAWRY_CASH
            : OrderTypes.CREDIT;
        await order.save({ transaction });

        break;
      }
      case FawryOrderStatus.UNPAID: {
        console.log(FawryOrderStatus.UNPAID);
        order.fawryReferenceNumber = paymentResponse.fawryRefNumber;
        order.type =
          paymentResponse.paymentMethod === "PAYATFAWRY"
            ? OrderTypes.FAWRY_CASH
            : OrderTypes.CREDIT;
        await order.save({ transaction });

        break;
      }
      case FawryOrderStatus.PAID: {
        console.log(FawryOrderStatus.PAID);
        await confirmOrder({ order, transaction });
        break;
      }
      case FawryOrderStatus.CANCELED: {
        console.log(FawryOrderStatus.CANCELED);
        order.status = OrderStatusTypes.CANCELLED;
        await order.save({ transaction });
        break;
      }
      case FawryOrderStatus.DELIVERED: {
        console.log(FawryOrderStatus.DELIVERED);
        order.status = OrderStatusTypes.CONFIRMED;
        await order.save({ transaction });
        break;
      }
      case FawryOrderStatus.REFUNDED: {
        console.log(FawryOrderStatus.REFUNDED);
        order.status = OrderStatusTypes.RETURNED;
        await order.save({ transaction });
        break;
      }
      case FawryOrderStatus.EXPIRED: {
        console.log(FawryOrderStatus.EXPIRED);
        // order.status = OrderStatusTypes.EXPIRED;
        // await order.save({ transaction });
        break;
      }
      case FawryOrderStatus.FAILED: {
        console.log(FawryOrderStatus.FAILED);
        order.status = OrderStatusTypes.FAILED;
        await order.save({ transaction });
        break;
      }
      case FawryOrderStatus.FAILD: {
        console.log(FawryOrderStatus.FAILD);
        order.status = OrderStatusTypes.FAILED;
        await order.save({ transaction });
        break;
      }
      default: {
        throw new AppError("Invalid order status", 400);
      }
    }
  });

  res.end();
});
