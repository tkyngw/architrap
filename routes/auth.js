const router = require("express").Router();


router.get('/login', (req, res, next) => {
	res.render('login')
});


router.post('/login', (req, res, next) => {
	const { username, password } = req.body;
	// do we have a user with that username in the db
	User.findOne({ username: username })
		.then(userFromDB => {
			if (userFromDB === null) {
				// username is not correct -> show login form again
				res.render('login', { message: 'Invalid Credentials' })
				return
			}
			// username is correct	
			// check the password from the form against the hash in the db
			if (bcrypt.compareSync(password, userFromDB.password)) {
				// the password matches -> the user get's logged in
				// req.session.<some key (usually user)>
				req.session.user = userFromDB
				res.redirect('/company')
			} else {
				// password is not correct
				res.render('login', { message: 'Invalid Crentials' })
			}
		})
});

router.get('/signup', (req, res, next) => {
	res.render('signup')
});

module.exports = router;