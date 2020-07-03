const express = require("express");
const router = express.Router();
const passport = require("passport");

const main_controller = require("../controllers/mainController");
const passport_controller = require("../controllers/passportController")

/* GET home page. */
router.get("/", main_controller.index_get);

router.get("/log-in", passport_controller.log_in_get);

router.post("/log-in", passport_controller.log_in_post);

router.get("/log-out", passport_controller.log_out_get);

router.get("/sign-up", main_controller.sign_up_get);
router.post("/sign-up", main_controller.sign_up_post);

router.get("/member", main_controller.member_get);
router.post("/member", main_controller.member_post);

router.get("/new-message", main_controller.new_message_get);
router.post("/new-message", main_controller.new_message_post);

router.post("/delete", main_controller.delete_post);

module.exports = router;
