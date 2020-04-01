exports.sign_up_get = function(req, res) {
	res.render('sign-up-form');
}

exports.sign_up_post = function(req, res) {
	res.send('sign up on post');
}
