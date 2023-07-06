require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const expressValidator = require("express-validator");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");

// const pg = require("pg");
// const connection = require("/database");

const indexRouter = require("./src/routes/index");
const musicRouter = require("./src/routes/music");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT;

app.use(
  session({
    secret: "123456cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());
// app.use(expressValidator());

app.use("/", indexRouter);
app.use("/list", musicRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

module.exports = app;
