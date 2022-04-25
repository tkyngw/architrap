const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
// const Company = require('../models/Company');
// const Review = require('../models/Review');

router.get('/signup', (req, res, next) => {
	res.render('signup')
});

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body
	// is the password 4+ characters
	if (password.length < 4) {
		res.render('signup', { message: 'Your password has to be 4 chars min' })
		return
	}
	// is the username not empty
	if (username.length === 0) {
		res.render('signup', { message: 'Your username cannot be empty' })
		return
	}
	// validation passed
	// do we already have a user with that username?
	User.findOne({ username: username })
		.then(userFromDB => {
			// if there is a user
			if (userFromDB !== null) {
				res.render('signup', { message: 'Your username is already taken' })
				return
			} else {
				// we can use that username
				// we hash the password
				const salt = bcrypt.genSaltSync()
				const hash = bcrypt.hashSync(password, salt)
				// create the user
				User.create({
					username: username,
					password: hash
				})
					.then(createdUser => {
						console.log(createdUser)
						res.redirect('/')
					})
					.catch(err => {
						next(err)
					})
				}
			})
		})


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