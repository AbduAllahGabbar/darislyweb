const Sequelize = require("sequelize");
const { sequelize } = require("../../models/index");
const {
  CartItem,
  Product,
  CourseGroupSession,
  Lecture,
  Course,
  Subject,
  Tutor,
} = require("../../models");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const createPaginationObject = require("../../utils/createPaginationObject");
const { ProductTypes } = require("../../enums/index");

/**
 * getCartItems
 * URL: cartitems
 * Method: GET
 * Response: [{id, hasImage, name, phone}]
 */

exports.getCartItems = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  let { count, rows } = await CartItem.findAndCountAll({
    attributes: ["id", "productId"],
    where: { studentId: req.user.id },
    include: {
      model: Product,
      as: "product",
      attributes: ["type"],
      where: { type: ProductTypes.SESSION },
      include: {
        model: CourseGroupSession,
        as: "courseGroupSession",
        attributes: ["id", "from", "to", "date"],
        include: {
          model: Lecture,
          as: "lecture",
          attributes: ["id", "title", "price"],
          include: {
            model: Course,
            as: "course",
            attributes: ["id", "education", "grade", "hasImage"],
            include: [
              {
                model: Subject,
                as: "subject",
                attributes: ["name"],
              },
              {
                model: Tutor,
                as: "tutor",
                attributes: ["id", "firstName", "lastName", "hasImage"],
              },
            ],
          },
        },
      },
    },
    raw: true,
    nest: true,
  });

  rows = rows.map((row) => ({
    id: row.id,
    productId: row.productId,
    type: row.product.type,
    serviceCharge: process.env.FIXED_LECTURE_FEES,
    data: {
      session: row.product.courseGroupSession,
    },
  }));

  res.status(200).json(rows);
});

/**
 * createCartItem
 * URL: /cartitems
 * Method: POST
 * Body: { productId }
 * Response: OK
 */

// TODO: Check product id exists

exports.createCartItem = catchAsync(async (req, res, next) => {
  // TODO: Check product type and return the corresponding data

  const products = req.body.productIds.map((productId) => ({
    studentId: req.user.id,
    productId,
  }));

  let cartItems;

  await sequelize.transaction(async (transaction) => {
    await CartItem.bulkCreate(products, {
      validate: true,
      transaction,
    });

    cartItems = await CartItem.findAll({
      attributes: ["id", "productId"],
      where: {
        productId: req.body.productIds,
        studentId: req.user.id,
      },
      include: {
        model: Product,
        as: "product",
        attributes: ["type"],
        where: { type: ProductTypes.SESSION },
        include: {
          model: CourseGroupSession,
          as: "courseGroupSession",
          attributes: ["id", "from", "to", "date"],
          include: {
            model: Lecture,
            as: "lecture",
            attributes: ["id", "title", "price"],
            include: {
              model: Course,
              as: "course",
              attributes: ["id", "education", "grade", "hasImage"],
              include: [
                {
                  model: Subject,
                  as: "subject",
                  attributes: ["name"],
                },
                {
                  model: Tutor,
                  as: "tutor",
                  attributes: ["id", "firstName", "lastName", "hasImage"],
                },
              ],
            },
          },
        },
      },
      raw: true,
      nest: true,
      transaction,
    });

    cartItems = cartItems.map((cartItem) => ({
      id: cartItem.id,
      productId: cartItem.productId,
      type: cartItem.product.type,
      serviceCharge: process.env.FIXED_LECTURE_FEES,
      data: {
        session: cartItem.product.courseGroupSession,
      },
    }));
  });

  res.status(200).json(cartItems);

  //   let cartItem;

  //   await sequelize.transaction(async (transaction) => {
  //     cartItem = await CartItem.create(
  //       { studentId: req.user.id, productId: req.body.productId },
  //       { transaction }
  //     );
  //   });

  //   res.status(200).json(cartItem);
});

/**
 * deleteCartItem
 * URL: cartitems/:id
 * Method: DELETE
 * Response: OK
 */

exports.deleteCartItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const destroyed = await CartItem.destroy({
    where: { id, studentId: req.user.id },
  });

  if (destroyed === 0)
    throw new AppError("No cart item was found with that id", 404);

  res.status(200).send();
});

exports.getTaxes = catchAsync(async (req, res, next) => {
  res.status(200).json({ tax: process.env.TAX_PERCENTAGE });
});
