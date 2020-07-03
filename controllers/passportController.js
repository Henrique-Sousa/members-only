const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.comparePassword = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { msg: "Incorrect username" });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        // passwords match! log user in
        return done(null, user);
      } else {
        // passwords do not match!
        return done(null, false, { msg: "Incorrect password" });
      }
    });
  });
})


exports.log_in_get = function (req, res) {
  res.render("log-in-form");
}

exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
})

exports.log_out_get = (req, res) => {
  req.logout();
  res.redirect("/");
}