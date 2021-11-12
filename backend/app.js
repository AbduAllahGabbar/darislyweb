require("dotenv").config();
const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const passport = require("passport");
const http = require("http");
const port = process.env.PORT || 8085;
const app = express();
const errorController = require("./controllers/errorController/errorController");
const errors = require("./utils/errorHandlers");
const cookieSession = require("cookie-session");
const zoomRoutes = require("./routes/zoom");

app.use(express.static("public"));

var corsOptions = {
  credentials: true,
  origin: true,
};

app.use(cors(corsOptions));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* Routers */

const authRoutes = require("./routes/auth");
const coursesRoutes = require("./routes/courses");
const quizzesRoutes = require("./routes/quizzes");
const studentsRoutes = require("./routes/students");
const tutorsRoutes = require("./routes/tutors");
const citiesRoutes = require("./routes/cities");
const ordersRoutes = require("./routes/orders");
const lecturesRoutes = require("./routes/lectures");
const sectionsRoutes = require("./routes/sections");
const staffRoutes = require("./routes/staff");
const paymobRoutes = require("./routes/paymob");
const adminRoutes = require("./routes/admin");
const groupRoutes = require("./routes/courseGroup");
const sessionRoutes = require("./routes/sessions");
const subjectRoutes = require("./routes/subjects");
const centerRoutes = require("./routes/centers");
const notificationRoutes = require("./routes/notifications");
const cartItemsRoutes = require("./routes/cartItems");
const paymentsRoutes = require("./routes/payments");
const transactionsRoutes = require("./routes/transactions");
const migrateRoutes = require("./routes/migrate");

/* Middlewares */

app.use(
  bodyParser.json({
    extended: true,
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  if (req.get("X-Forwarded-Proto") == "http" && process.env.ENFORCE_HTTPS) {
    // request was via http, so redirect to https
    console.log("Redirecting to " + "https://" + req.headers.host + req.url);
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    next();
  }
});

app.use(morgan("dev"));

/* Routes */

const baseApiUrl = `/v${process.env.API_VERSION}`;

app.use(`${baseApiUrl}/auth`, authRoutes);
app.use(`${baseApiUrl}/courses`, coursesRoutes);
app.use(`${baseApiUrl}/quizzes`, quizzesRoutes);
app.use(`${baseApiUrl}/students`, studentsRoutes);
app.use(`${baseApiUrl}/tutors`, tutorsRoutes);
app.use(`${baseApiUrl}/cities`, citiesRoutes);
app.use(`${baseApiUrl}/lectures`, lecturesRoutes);
app.use(`${baseApiUrl}/sections`, sectionsRoutes);
app.use(`${baseApiUrl}/orders`, ordersRoutes);
app.use(`${baseApiUrl}/staff`, staffRoutes);
app.use(`${baseApiUrl}/paymob`, paymobRoutes);
app.use(`${baseApiUrl}/admin`, adminRoutes);
app.use(`${baseApiUrl}/coursegroups`, groupRoutes);
app.use(`${baseApiUrl}/subjects`, subjectRoutes);
app.use(`${baseApiUrl}/centers`, centerRoutes);
app.use(`${baseApiUrl}/sessions`, sessionRoutes);
app.use(`${baseApiUrl}/notifications`, notificationRoutes);
app.use(`${baseApiUrl}/zoom`, zoomRoutes);
app.use(`${baseApiUrl}/cartitems`, cartItemsRoutes);
app.use(`${baseApiUrl}/payments`, paymentsRoutes);
app.use(`${baseApiUrl}/transactions`, transactionsRoutes);
// app.use(`${baseApiUrl}/migrate`, migrateRoutes);

app.use("*", (req, res, next) => {
  res.status(404).send("This route can't be found");
});

app.use(errors.errorHandler);

/* Start server listening */

const server = http.createServer(app);

// let server;

(async () => {
  try {
    await sequelize.up();
    server.listen(port, () => {
      console.log("Server started at", port);
    });
  } catch (err) {
    console.log(err);
  }
})();

/* Handle possible uncaught errors */

process.on("unhandledRejection", (err) => {
  console.log(err);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("warning", (e) => console.warn(e.stack));

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
