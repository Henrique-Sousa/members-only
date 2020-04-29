var express = require("express");
var router = express.Router();

var main_controller = require("../controllers/mainController");

/* GET home page. */
router.get("/", main_controller.index_get);

router.get("/sign-up", main_controller.sign_up_get);
router.post("/sign-up", main_controller.sign_up_post);

router.get("/member", main_controller.member_get);
router.post("/member", main_controller.member_post);

router.get("/new-message", main_controller.new_message_get);
router.post("/new-message", main_controller.new_message_post);

module.exports = router;
