const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const compression = require("compression");
const helmet = require("helmet");
const passport_controller = require("./controllers/passportController")

if (process.env.NODE_ENV != 'production') {
  require("dotenv").config();
}

const User = require("./models/user");

const indexRouter = require("./routes/index");

const user = process.env.username;
const pass = process.env.password;
const host = process.env.host;
const dbase = process.env.database;

const mongoDB = ((process.env.NODE_ENV == 'production') ? process.env.MONGODB_URI : "mongodb+srv://" +
  user +
  ":" +
  pass +
  "@" +
  host +
  "/" +
  dbase +
  "?retryWrites=true&w=majority");

mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
app.use(compression());
app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(passport_controller.comparePassword);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

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

module.exports = app;
