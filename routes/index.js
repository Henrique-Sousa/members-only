var express = require("express");
var router = express.Router();

var main_controller = require("../controllers/mainController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Clubhouse" });
});

router.get("/sign-up", main_controller.sign_up_get);
router.post("/sign-up", main_controller.sign_up_post);
router.get("/log-in", main_controller.log_in_get);

module.exports = router;
