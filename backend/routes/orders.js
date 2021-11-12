const express = require("express");
const orderController = require("../controllers/orderController/order");
const orderValidator = require("../controllers/orderController/orderValidator");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");
const AppErrpr = require("../utils/appError");
const validation = require("../middlewares/validation");
const { authorizeUserToOrder } = require("../middlewares/authorization/orders");

const router = express.Router();

router
  .route("/:orderId/status")
  .put(
    validation(orderValidator.changeOrderStatus),
    restrictTo(UserRoles.STAFF),
    authorizeUserToOrder,
    orderController.changeOrderStatus
  );

router
  .route("/:orderId")
  .get(
    validation(orderValidator.getOrder),
    restrictTo(UserRoles.STAFF, UserRoles.STUDENT, UserRoles.TUTOR),
    authorizeUserToOrder,
    orderController.getOrder
  );

router.route("/").get(orderController.getOrders);
// .post( // DEPRECATED
//   validation(orderValidator.createOrder),
//   restrictTo(UserRoles.STUDENT),
//   orderController.createOrder
// );

router
  .route("/online")
  .post(restrictTo(UserRoles.STUDENT), orderController.createOnlineOrder);

module.exports = router;
