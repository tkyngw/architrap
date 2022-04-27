const { compile } = require("hbs");
const Company = require("../models/Company")
const router = require("express").Router();
//middleware
  


/* GET home page */
router.get("/", (req, res, next) => {
  const loggedInUser = req.user
  // console.log(req.user)
  res.render("index" , { user: req.user});
});

router.get('/about', (req, res, next) => {
  res.render('about')
})

router.get('/result', (req, res, next) => {
  const queryString = req.query.q
  const companies = []
  // console.log(queryString)
  Company.find({ }) // find all the companies from DB
  .then(companiesFromDB => {  
    if(companiesFromDB === null){
        res.render('result', { message : 'Sorry, no results found'})
        return
      } else {
      // console.log('companies found from database :' , companiesFromDB)
      // console.log(companiesFromDB[0].name)
      for (let company of companiesFromDB){ // iterate over the companies array
        if(company.name.includes(queryString)) { // if the company's name includes queryString
          // console.log(company)
          companies.push(company)
        }
      } console.log('this is the result:' , companies)
      res.render('result', {companies : companies}) // render that companies 
    }
  })
  .catch(err => {
    next(err)
  })
})

router.get('/result', (req, res, netx) => {
  Company.find({ })
  .then(result =>{
    res.json(result)
  })
  .catch(err => {
    next(err)
  })
})


module.exports = router;

