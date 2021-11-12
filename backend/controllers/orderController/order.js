const Sequelize = require("sequelize");
const catchAsync = require("../../utils/catchAsync");
const convertArrayToObject = require("../../utils/convertArrayToObject");
const {
  Order,
  OrderItem,
  Lecture,
  CourseGroupSession,
  CourseGroup,
  Course,
  Tutor,
  Subject,
  Attendance,
  Student,
  CartItem,
  Product,
  CourseGroupSessionSchedule,
  Quiz,
  QuizSession,
  QuizAnswer,
} = require("../../models");
const { Op } = require("sequelize");
const AppError = require("../../utils/appError");
const createPaginationObject = require("../../utils/createPaginationObject");
const acceptsdk = require("../../services/accept");
const { sequelize } = require("../../models/index.js");
const {
  OrderTypes,
  AttendanceTypes,
  OrderStatusTypes,
  CourseGroupTypes,
  ProductTypes,
} = require("../../enums");
const { firstName } = require("../../utils/errors");

/**
 * URL: /orders
 * Method: GET
 * Response: {orders: [{id, date, status, total}, ...]}
 */

// DONE add pagination

exports.getOrders = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  let { count, rows } = await Order.findAndCountAll({
    where: { studentId: req.user.id },
    attributes: [
      "id",
      "status",
      "createdAt",
      "token",
      [Sequelize.fn("sum", Sequelize.col("orderItems.price")), "total"],
    ],
    include: {
      model: OrderItem,
      as: "orderItems",
      attributes: [],
    },
    group: ["id"],
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
    subQuery: false,
  });

  const pagingObject = createPaginationObject(page, limit, count.length, rows);

  res.status(200).json(pagingObject);
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  let order = await Order.findByPk(orderId, {
    attributes: ["id", "createdAt", "status", "type", "token"],
    include: [
      {
        model: Student,
        as: "student",
        attributes: [
          "id",
          "email",
          "firstName",
          "lastName",
          "phone",
          "countryCode",
          "country",
          "hasImage",
        ],
      },
      {
        model: OrderItem,
        as: "orderItems",
        attributes: ["price", "id"],
        include: {
          model: CourseGroupSession,
          as: "courseGroupSession",
          attributes: ["id", "from", "to", "date"],
          include: [
            {
              model: Lecture,
              as: "lecture",
              attributes: ["id", "title", "price"],
              include: [
                {
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

                {
                  model: Quiz,
                  as: "quiz",
                  attributes: ["id"],
                  include: {
                    model: QuizSession,
                    as: "quizSessions",
                    attributes: ["id"],
                    include: {
                      model: QuizAnswer,
                      as: "quizAnswers",
                      required: false,
                      where: {
                        studentId: {
                          [Sequelize.Op.eq]: sequelize.col("student.id"),
                        },
                      },
                    },
                  },
                },
              ],
            },
            {
              model: Attendance,
              as: "attendances",
              required: false,
              where: {
                studentId: {
                  [Sequelize.Op.eq]: sequelize.col("student.id"),
                },
              },
            },

            {
              model: CourseGroupSessionSchedule,
              as: "courseGroupSessionSchedules",
              required: false,
              where: {
                studentId: {
                  [Sequelize.Op.eq]: sequelize.col("student.id"),
                },
              },
            },
          ],
        },
      },
    ],
  });

  order = order.toJSON();

  order.orderItems.forEach((el) => {
    el.tutor = el.courseGroupSession.lecture.course.tutor;
    el.courseGroupSession.lecture.course.tutor = undefined;

    el.subject = el.courseGroupSession.lecture.course.subject;
    el.courseGroupSession.lecture.course.subject = undefined;

    el.course = el.courseGroupSession.lecture.course;
    el.courseGroupSession.lecture.course = undefined;

    el.lecture = el.courseGroupSession.lecture;
    el.courseGroupSession.lecture = undefined;

    el.session = el.courseGroupSession;
    el.courseGroupSession = undefined;

    if (el.session.courseGroupSessionSchedules.length) {
      const toDate = new Date(el.session.courseGroupSessionSchedules[0].to);
      const currentDate = new Date();
      const canOpenLecture = currentDate > toDate;

      el.attended = canOpenLecture
        ? AttendanceTypes.PRESENT
        : AttendanceTypes.LATE;
    } else {
      el.attended = el.session.attendances.length
        ? el.session.attendances[0].attended
        : AttendanceTypes.ABSENT;
    }

    delete el.session.attendances;

    if (el.lecture.quiz && el.lecture.quiz.quizSessions) {
      el.quiz = {
        id: el.lecture.quiz.id,
        quizSessionId: el.lecture.quiz.quizSessions[0].id,
        answered: el.lecture.quiz.quizSessions[0].quizAnswers !== null,
      };
    } else {
      el.quiz = null;
    }
    delete el.lecture.quiz;

    return el;
  });

  res.status(200).json(order);
});

/**
 * createOrder
 * URL: /orders
 * Method: POST
 * Body: { courseGroupSessions: [ sessionId1, sessionId2, ... ] }
 * Response: OK
 */

// DONE retrieve studentId from logged in user
// DONE update order enums

exports.createOrder = catchAsync(async (req, res, next) => {
  const { type, courseGroupSessions, centerId } = req.body;

  const response = await createOrderLogic({
    type,
    courseGroupSessions,
    user: req.user,
    centerId,
  });

  res.status(200).json(response);
});

/**
 * Creates a new order
 * @param {Object} params
 * @param {enum} params.type The type of the order
 * @param {Array} params.courseGroupSessions The array of courseGroupSession ids wanted to make an order with
 * @param {Student} params.user The user making the request
 * @param {Number} params.centerId The center to make the payment in (if exists)
 */

const createOrderLogic = async (params) => {
  let { type, courseGroupSessions, user, centerId } = params;

  const courseGroupSessionsIds = courseGroupSessions.map((el) => el.id);
  const sessionTypes = courseGroupSessions.reduce((obj, el) => {
    obj[el.id] = el.type;
    return obj;
  }, {});
  const sessions = await CourseGroupSession.findAll({
    attributes: ["id", [Sequelize.col("lecture.price"), "price"]],
    where: {
      id: { [Op.in]: courseGroupSessionsIds },
    },
    include: [
      {
        model: Lecture,
        as: "lecture",
        attributes: [],
      },
      {
        model: CourseGroup,
        as: "courseGroup",
        attributes: ["type"],
      },
    ],
    raw: true,
    nest: true,
  });

  const orderItems = [];

  sessions.forEach((session) => {
    orderItem = {};
    orderItem.courseGroupSessionId = session.id;
    orderItem.price = session.price;

    const wantedSessionType = sessionTypes[session.id];
    const sessionType = session.courseGroup.type;

    if (wantedSessionType) {
      if (
        session.courseGroup.type !== CourseGroupTypes.BOTH &&
        session.courseGroup.type !== wantedSessionType
      )
        throw new AppError(
          `You provided a wrong type (online or center) for the session item with id ${session.id}`,
          400
        );

      orderItem.type = wantedSessionType;
    } else {
      orderItem.type = wantedSessionType;
    }

    orderItems.push(orderItem);
  });

  switch (type) {
    case OrderTypes.CASH: {
      const { orderToken, totalPrice } = await createCashOrderTransaction(
        user,
        orderItems,
        centerId
      );

      return { orderToken, totalPrice };
    }
    case OrderTypes.CREDIT: {
      const { paymentKey } = await createOnlineOrderTransaction(
        user,
        orderItems
      );
      return { paymentKey };
    }
    default: {
      throw new AppError("Invalid order type", 400);
    }
  }
};

const generateOrderToken = async (transaction = null) => {
  const dateNow = new Date().toISOString().split("T")[0];

  const orderCount = await Order.count({
    where: Sequelize.where(
      Sequelize.fn("date", Sequelize.col("created_at")),
      dateNow
    ),
    ...(transaction ? { transaction } : {}),
  });

  const token = dateNow.replace(/-/g, "") + String(orderCount);

  return token;
};

const createCashOrderTransaction = async (user, orderItems, centerId) => {
  const token = await generateOrderToken();

  const orderObject = await Order.create(
    {
      studentId: user.id,
      orderItems: orderItems,
      type: OrderTypes.CASH,
      centerId: centerId,
      token: token,
    },
    {
      include: {
        model: OrderItem,
        as: "orderItems",
      },
    }
  );

  let totalPrice = 0;

  for (let orderItem of orderObject.orderItems) totalPrice += orderItem.price;

  const orderToken = orderObject.token;

  return { orderToken, totalPrice };
};

const createOnlineOrderTransaction = async (user, orderItems) => {
  let amount = 0;

  for (let orderItem of orderItems) {
    amount += orderItem.price;
  }

  amount *= 100.0;

  let paymentKey;

  await sequelize.transaction(async (t) => {
    const token = (await acceptsdk.getAuthToken()).data.token;
    const orderId = (await acceptsdk.registerOrder(token, amount)).data.id;

    const orderToken = generateOrderToken();

    const [__, acceptResponse] = await Promise.all([
      Order.create(
        {
          studentId: user.id,
          orderItems: orderItems,
          type: OrderTypes.CREDIT,
          token: orderToken,
        },
        {
          include: {
            model: OrderItem,
            as: "orderItems",
          },
          transaction: t,
        }
      ),
      acceptsdk.getPaymentKey(token, amount, orderId, {
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    ]);
    paymentKey = acceptResponse.data.token;
  });

  return { paymentKey };
};

exports.changeOrderStatus = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const { status, type, discount } = req.body;

  const order = await Order.findByPk(orderId);

  if (!order) throw new AppError("No order found with that id", 404);

  if (status === OrderStatusTypes.CONFIRMED) {
    await confirmOrder({ order, type, discount });
  } else if (order.status === OrderStatusTypes.CONFIRMED) {
    await unconfirmOrder(order, status);
  } else {
    order.status = status;
    await order.save();
  }

  res.status(200).send();
});

const confirmOrder = async ({ order, type, discount, transaction }) => {
  // changed from anything else to confirmed, go create attendance
  const orderItems = await OrderItem.findAll({
    where: { orderId: order.id },
  });

  if (type) order.type = type;
  if (discount) order.discount = discount;

  const attendance = [];

  orderItems.forEach((orderItem) => {
    attendance.push({
      studentId: order.studentId,
      courseGroupSessionId: orderItem.courseGroupSessionId,
      attended: AttendanceTypes.ABSENT,
      type: orderItem.type,
    });
  });

  if (order.status === OrderStatusTypes.CONFIRMED) {
    // order was already confirmed, only save
    await order.save();
  } else {
    // order was not confirmed, confirming now..
    order.status = OrderStatusTypes.CONFIRMED;
    if (transaction) {
      await Promise.all([
        Attendance.bulkCreate(attendance, {
          validate: true,
          transaction,
          fields: ["studentId", "courseGroupSessionId", "attended", "type"],
          updateOnDuplicate: ["attended"],
        }),
        order.save({ transaction }),
        CartItem.destroy({
          where: { studentId: order.studentId },
          transaction,
        }),
      ]);
    } else {
      await sequelize.transaction(async (t) => {
        await Promise.all([
          Attendance.bulkCreate(attendance, {
            validate: true,
            transaction: t,
            fields: ["studentId", "courseGroupSessionId", "attended", "type"],
            updateOnDuplicate: ["attended"],
          }),
          order.save({ transaction: t }),
          CartItem.destroy({
            where: { studentId: order.studentId },
            transaction,
          }),
        ]);
      });
    }
  }
};

const unconfirmOrder = async (order, newStatus) => {
  if (newStatus === order.status)
    throw new AppError("The order already has that status", 400);

  if (order.status !== OrderStatusTypes.CONFIRMED)
    throw new AppError("The order is already not confirmed", 400);

  // changed from confirmed to anything, go delete attendance

  const studentId = order.studentId;

  const orderItems = await OrderItem.findAll({
    where: { orderId: order.id },
  });

  order.status = newStatus;

  const sessionIds = [];

  orderItems.forEach((orderItem) => {
    sessionIds.push(orderItem.courseGroupSessionId);
  });

  await sequelize.transaction(async (t) => {
    await Attendance.destroy({
      where: {
        courseGroupSessionId: sessionIds,
        studentId: studentId,
      },
      transaction: t,
    });

    await order.save({ transaction: t });
  });
};

/**
 * createOnlineOrderFromCart
 * URL: /orders/online
 * Method: POST
 * Body: {}
 * Response: OK
 */

exports.createOnlineOrder = catchAsync(async (req, res, next) => {
  let cartItems;
  let paymentUrl;

  await sequelize.transaction(async (transaction) => {
    cartItems = await CartItem.findAll({
      attributes: ["id", "productId"],
      where: {
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
          include: [
            {
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
            {
              model: CourseGroup,
              as: "courseGroup",
              attributes: ["type"],
            },
          ],
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
      sessionType: cartItem.product.courseGroupSession.courseGroup.type,
      session: cartItem.product.courseGroupSession,
    }));

    const sessionTypes = cartItems.reduce((obj, el) => {
      obj[el.session.id] = CourseGroupTypes.ONLINE;
      return obj;
    }, {});

    const orderItems = [];

    let checkoutTotal = 0;

    cartItems.forEach((cartItem) => {
      const price =
        Number(
          (
            (cartItem.session.lecture.price *
              (100 + Number(process.env.TAX_PERCENTAGE))) /
            100
          ).toFixed(2)
        ) + Number(process.env.FIXED_LECTURE_FEES);

      checkoutTotal += price;

      orderItem = {};
      orderItem.courseGroupSessionId = cartItem.session.id;
      orderItem.price = price;

      const wantedSessionType = sessionTypes[cartItem.session.id];

      if (wantedSessionType) {
        if (
          cartItem.session.courseGroup.type !== CourseGroupTypes.BOTH &&
          cartItem.session.courseGroup.type !== wantedSessionType
        )
          throw new AppError(
            `You provided a wrong type (online or center) for the session item with id ${cartItem.session.id}`,
            400
          );

        orderItem.type = wantedSessionType;
      } else {
        orderItem.type = wantedSessionType;
      }

      orderItems.push(orderItem);
    });

    const checkoutOrderItems = [
      {
        productSKU: "0",
        description: "Course Lectures - حصص",
        price: Number(checkoutTotal.toFixed(2)),
        quantity: "1",
        length: "100",
        weight: "1",
      },
    ];

    const orderToken = await generateOrderToken(transaction);

    const orderObject = await Order.create(
      {
        studentId: req.user.id,
        orderItems: orderItems,
        token: orderToken,
      },
      {
        include: {
          model: OrderItem,
          as: "orderItems",
        },
      }
    );

    // await Promise.all([
    //   Order.create(
    //     {
    //       studentId: req.user.id,
    //       orderItems: orderItems,
    //       token: orderToken,
    //     },
    //     {
    //       include: {
    //         model: OrderItem,
    //         as: "orderItems",
    //       },
    //       transaction,
    //     }
    //   ),
    //   CartItem.destroy({
    //     where: { studentId: req.user.id },
    //     transaction,
    //   }),
    // ]);

    paymentUrl = `${
      process.env.FAWRY_API_URL
    }/ECommercePlugin/FawryPay.jsp?chargeRequest=${JSON.stringify({
      language: req.user.lang === "ar" ? "ar-eg" : "en-us",
      merchantCode: process.env.FAWRY_MERCHANT_CODE,
      merchantRefNumber: orderToken,
      customer: {
        name: `${req.user.firstName.trim()} ${req.user.lastName.trim()}`,
        mobile: `${req.user.countryCode}${req.user.phone}`,
        email: req.user.email,
      },
      order: {
        description: "Course",
        expiry: process.env.FAWRY_PAYMENT_EXPIRY_HOURS,
        orderItems: checkoutOrderItems,
      },
      signature: process.env.FAWRY_MERCHANT_SIGNATURE,
    })}&successPageUrl=${
      process.env.HOST_URL
    }/v1/payments/success&failerPageUrl=${process.env.HOST_URL}/v1/payments/fail
    `;
  });

  console.log(paymentUrl);

  res.status(200).json({ paymentUrl });
});

exports.confirmOrder = confirmOrder;
