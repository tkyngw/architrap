const router = require("express").Router();
const Company = require('../models/Company');


router.get('/company', (req, res, next) => 
res.render('company'));

router.get('/add', (req, res, next) => {
	res.render('add')
});








module.exports = router;


