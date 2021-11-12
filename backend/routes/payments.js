const router = require("express").Router();
const paymentController = require("../controllers/paymentController/payment");

router.get("/success", paymentController.paymentSuccess);
router.get("/fail", paymentController.paymentFail);
router
  .route("/notifications")
  .get(paymentController.paymentNotificationV1)
  .post(paymentController.paymentNotificationV2);

module.exports = router;
