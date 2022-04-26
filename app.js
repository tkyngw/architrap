// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "architrap";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/", auth);

const company = require("./routes/company");
app.use("/", company);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// session conffiguration 
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(
	session({
	  secret: process.env.SESSION_SECRET,
	  resave: true,
	  saveUninitialized: false, // <== false if you don't want to save empty session object to the store
	  cookie: {
		maxAge: 180000 
 },
	  store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/myFirstDatabase'
	  })
	})
  );
// end session 
// here starts passport config 

const User = require('./models/User')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, cb) => cb(null, user._id));
 
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});
 
passport.use((
	new LocalStrategy((username, password, done) => {
		// this logic will be executed when we log in
		User.findOne({ username: username })
			.then(user => {
				if (user === null) {
					// username is not correct
					done(null, false, { message: 'Wrong Credentials' })
				} else {
					done(null, user)
				}
			})
	})
))

app.use(passport.initialize());
app.use(passport.session());


module.exports = app;
