const Sequelize = require("sequelize");
const { sequelize } = require("../../models");
const { Order } = require("../../models");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { OrderTypes, FawryOrderStatus } = require("../../enums");
const { confirmOrder } = require("../orderController/order");

exports.transactionSuccess = catchAsync(async (req, res, next) => {
  const chargeResponse = JSON.parse(req.query.chargeResponse);

  await sequelize.transaction(async (transaction) => {
    const order = await Order.findOne({
      where: { token: chargeResponse.merchantRefNumber },
      transaction,
    });

    order.fawryReferenceNumber = chargeResponse.fawryRefNumber;
    order.type =
      chargeResponse.paymentMethod === "PAYATFAWRY"
        ? OrderTypes.FAWRY_CASH
        : OrderTypes.CREDIT;
    await confirmOrder({ order, transaction });
  });

  res
    .send(
      `<script>
            window.parent.location.replace("http://localhost:3000");
        </script>`
    )
    .end();
});

exports.transactionFail = catchAsync(async (req, res, next) => {
  await Order.destroy({
    where: { token: req.query.merchantRefNum },
  });

  res
    .send(
      `<script>
            window.parent.location.replace("http://localhost:3000/cart");
        </script>`
    )
    .end();
});

exports.transactionNotificationV1 = catchAsync(async (req, res, next) => {
  console.log(
    "--------------------- Payment Notification Response ---------------------"
  );

  console.log("req.query");
  console.log(req.query);
  console.log(req.query.MerchantRefNo);
  console.log(req.query.FawryRefNo);
  console.log(req.query.OrderStatus);
  console.log(req.query.Amount);
  console.log(req.query.MessageSignature);

  // const orderStatus = req.query.OrderStatus.trim().toLowerCase();

  // switch (orderStatus) {
  //   case FawryOrderStatus.NEW: {
  //     console.log(FawryOrderStatus.NEW);
  //     break;
  //   }
  //   case FawryOrderStatus.PAID: {
  //     console.log(FawryOrderStatus.PAID);
  //     break;
  //   }
  //   case FawryOrderStatus.CANCELED: {
  //     console.log(FawryOrderStatus.CANCELED);
  //     break;
  //   }
  //   case FawryOrderStatus.DELIVERED: {
  //     console.log(FawryOrderStatus.DELIVERED);
  //     break;
  //   }
  //   case FawryOrderStatus.REFUNDED: {
  //     console.log(FawryOrderStatus.REFUNDED);
  //     break;
  //   }
  //   case FawryOrderStatus.EXPIRED: {
  //     console.log(FawryOrderStatus.EXPIRED);
  //     break;
  //   }
  //   default: {
  //     throw new AppError("Invalid order status", 400);
  //   }
  // }

  res.end();
});

exports.transactionNotificationV2 = catchAsync(async (req, res, next) => {
  console.log(
    "--------------------- Payment Notification Response ---------------------"
  );

  console.log("req.body");
  console.log(req.body);

  console.log("req.query");
  console.log(req.query);
  // console.log(req.query.MerchantRefNo);
  // console.log(req.query.FawryRefNo);
  // console.log(req.query.OrderStatus);
  // console.log(req.query.Amount);
  // console.log(req.query.MessageSignature);

  // const orderStatus = req.query.OrderStatus.trim().toLowerCase();

  // switch (orderStatus) {
  //   case FawryOrderStatus.NEW: {
  //     console.log(FawryOrderStatus.NEW);
  //     break;
  //   }
  //   case FawryOrderStatus.PAID: {
  //     console.log(FawryOrderStatus.PAID);
  //     break;
  //   }
  //   case FawryOrderStatus.CANCELED: {
  //     console.log(FawryOrderStatus.CANCELED);
  //     break;
  //   }
  //   case FawryOrderStatus.DELIVERED: {
  //     console.log(FawryOrderStatus.DELIVERED);
  //     break;
  //   }
  //   case FawryOrderStatus.REFUNDED: {
  //     console.log(FawryOrderStatus.REFUNDED);
  //     break;
  //   }
  //   case FawryOrderStatus.EXPIRED: {
  //     console.log(FawryOrderStatus.EXPIRED);
  //     break;
  //   }
  //   default: {
  //     throw new AppError("Invalid order status", 400);
  //   }
  // }

  res.end();
});
