const router = require("express").Router();
const Company = require('../models/Company');
const Review = require('../models/Review');

router.get('/company', (req, res, next) => 
res.render('company'));

router.get('/addcompany', (req, res, next) => {
	res.render('addcompany')
});


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
//m


router.post('/review/:id', (req, res, next) => {
	const id = req.params.id
	const { name, yearsWorked, enviroment, salary, overtime, diversity, benefits, comments } = req.body
	const username = req.user.username
	console.log( username, name, yearsWorked, enviroment, salary, overtime, diversity, benefits, comments )
	Review.create( { username, name, yearsWorked, enviroment, salary, overtime, diversity, benefits, comments } )
		.then(dbComent => {
  // when the new coment is created, the company needs to be found and its posts updated with the ID of newly created coment
  			Company.findByIdAndUpdate(id, { $push: { review: dbComent._id } })
	   			.then(() => res.redirect(`/company/${id}`))
		})	
		.catch(err => next(err))
		});


module.exports = router;


