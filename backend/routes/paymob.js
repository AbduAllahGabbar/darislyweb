const Paymob = require("../controllers/paymobController/paymob");
const router = require("express").Router();

router.post("/notification_callback", Paymob.notificationCallback);
router.get("/txn_response_callback", Paymob.processCallBack);

module.exports = router;
