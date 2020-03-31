var express = require('express');
var router = express.Router();

var main_controller = require('../controllers/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clubhouse' });
});

router.get('/sign-up', main_controller.sign_up_get);

module.exports = router;
