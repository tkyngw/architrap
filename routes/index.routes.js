const { compile } = require("hbs");
const Company = require("../models/Company");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const loggedInUser = req.body.user
  console.log(loggedInUser)
  res.render("index" , { user: loggedInUser });
});

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


