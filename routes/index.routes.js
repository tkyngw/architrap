const { compile } = require("hbs");
const Company = require("../models/Company")
const router = require("express").Router();
//middleware
  


/* GET home page */
router.get("/", (req, res, next) => {
  const loggedInUser = req.user
  console.log(req.user)
  res.render("index" , { user: req.user});
});

router.get('/about', (req, res, next) => {
  res.render('about')
})

router.get('/result', (req, res, next) => {
  const queryString = req.query.q
  console.log(queryString)
  Company.findOne({name : queryString})
  .then(comapniesFromDB => {
    if(comapniesFromDB === null){
      res.render('result', { message : 'Sorry, no results found'})
      return
    } else if (comapniesFromDB.name === queryString){
    res.render('result', { companies : comapniesFromDB})
    } 
  })
  .catch(err => {
    next(err)
  })
})

module.exports = router;


