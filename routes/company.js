const router = require("express").Router();
const Company = require('../models/Company');


router.get('/company', (req, res, next) => 
res.render('company'));

router.get('/add', (req, res, next) => {
	res.render('add')
})


// create the company in the db
router.post('/company', (req, res, next) => {
	
	const { name, address, city, size, projectPhase, projectType } = req.body
	console.log( projectPhase, projectType )
	Company.create({
		name: name,
		address: address,
		city: city,
		size: size,
		projectPhase: projectPhase,
		projectType: projectType,
	})
		.then(createdCompany => {
			console.log(createdCompany)
			res.redirect(`/company/${createdCompany._id}`)
			// res.render('book', { book: createdCompany })
		})
		.catch(err => {
			next(err)
		})
});

router.get('/company/:id', (req, res, next) => {
	const id = req.params.id
	Company.findById(id)
		.then(companyFromDB => {
			res.render('company', { company : companyFromDB})
		})	
})



router.post('/company/:id/review', (req, res, next) => {
	const id = req.params.id
	const { user, text } = req.body
	Book.findByIdAndUpdate(id, { $push: { review: { user: user, text: text } } })
		.then(() => {
			res.redirect(`/company/${id}`)
		})
		.catch(err => next(err))
});


module.exports = router;


