const router = require("express").Router();
const transactionController = require("../controllers/transactionController/transaction");

router.get("/success", transactionController.transactionSuccess);
router.get("/fail", transactionController.transactionFail);
router
  .route("/notifications")
  .get(transactionController.transactionNotificationV1)
  .post(transactionController.transactionNotificationV2);

module.exports = router;
