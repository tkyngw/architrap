const router = require("express").Router();
const { populate } = require("../models/Company");
const Company = require('../models/Company');
const Review = require('../models/Review');
const User = require("../models/User");

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
	.populate('review')
		.then(companyFromDB => {
			console.log(companyFromDB)
			res.render('company', { company : companyFromDB})
		})	
})



router.post('/review/:id', (req, res, next) => {
	const id = req.params.id
	const { name, yearsWorked, enviroment, salary, overtime, diversity, benefits, comments } = req.body
	const username = req.user.username
	Review.create({ username, name, yearsWorked, enviroment, salary, overtime, diversity, benefits, comments })
		.catch(err => next(err))
		.then(dbComent => {
  // when the new coment is created, the company needs to be found and its posts updated with the ID of newly created coment
  			Company.findByIdAndUpdate(id, { $push: { review: dbComent._id } })
	   			.then(() => res.redirect(`/company/${id}`))
		})	
		.catch(err => next(err))
		});


router.get('/review/delete/:id', (req, res, next) => {
	const id = req.params.id
	console.log(req.params.id)
	const userid  = req.session.passport.user
	Review.findById(id)
		.then(idReviewDb => {
			User.findById(userid)
			.then(idUserDb =>{
				if(idUserDb.username === idReviewDb.username){
					Review.findByIdAndDelete(id)	
					.then(() => {
						Company.findOne
						//needs to be fixed the line below
						res.redirect(`/`)
					})
				}
				else{
					//needs to be fixed the line below
					res.redirect(`/`, { message: 'you cannot delete a review that its not writted by you' })
				}
			})
			.catch(err => next(err))
		})
		.catch(err => next(err))
});


module.exports = router;

