const { body, validationResult } = require("express-validator");

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
  //res.send("sign up on post");
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send("ok");
    } else {
      res.send("error");
    }
  }
];
