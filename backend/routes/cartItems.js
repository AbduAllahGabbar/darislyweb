const express = require("express");
const cartItemsController = require("../controllers/cartItemController/cartItem");
const restrictTo = require("../middlewares/restrictTo");
const { UserRoles } = require("../enums/index");

const router = express.Router();

router
  .route("/")
  .get(restrictTo(UserRoles.STUDENT), cartItemsController.getCartItems)
  .post(restrictTo(UserRoles.STUDENT), cartItemsController.createCartItem);

router
  .route("/:id")
  .delete(restrictTo(UserRoles.STUDENT), cartItemsController.deleteCartItem);

router.get("/tax", cartItemsController.getTaxes);

module.exports = router;
