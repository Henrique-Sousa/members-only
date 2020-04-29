const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");

exports.index_get = function (req, res, next) {
  if (req.user) {
    Message.find({})
      .populate("author")
      .exec(function (err, msgs) {
        res.render("index", { title: "Clubhouse", user: req.user, msgs });
      });
  } else {
    res.render("index", { title: "Clubhouse" });
  }
};

exports.sign_up_get = function (req, res) {
  res.render("sign-up-form");
};

exports.sign_up_post = [
  body("first_name")
    .notEmpty()
    .trim()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters.")
    .escape(),
  body("last_name")
    .notEmpty()
    .trim()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters.")
    .escape(),
  body("username")
    .notEmpty()
    .trim()
    .withMessage("Username must be specified.")
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters")
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password must be specified")
    .custom((value, { req, loc, path }) => {
      if (value != req.body.password_confirmation) {
        throw new Error("Passwords must match.");
      } else {
        return value;
      }
    }),
  body("password_confirmation")
    .notEmpty()
    .withMessage("Password confirmation must be specified"),
  (req, res, next) => {
    const errors = validationResult(req);
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
        admin: req.body.admin == "on",
      });
      if (errors.isEmpty()) {
        user.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      } else {
        res.render("sign-up-form", { user, errors: errors.array() });
      }
    });
  },
];

exports.member_get = function (req, res) {
  if (req.user) {
    res.render("member", { user: req.user });
  } else {
    res.redirect("/");
  }
};

exports.member_post = function (req, res) {
  if (req.body.passcode === "123456") {
    User.findByIdAndUpdate(
      req.user._id,
      { membership_status: true },
      (err, user) => {
        res.redirect("/");
      }
    );
  } else {
    res.render("member", { error: "wrong passcode", user: req.user });
  }
};

exports.new_message_get = function (req, res) {
  if (req.user) {
    res.render("new-message", { user: req.user });
  } else {
    res.redirect("/");
  }
};

exports.new_message_post = function (req, res, next) {
  const message = new Message({
    title: req.body.title,
    text: req.body.message,
    author: req.user,
  }).save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
