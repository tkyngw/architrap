const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const loggedInUser = req.body.user
  console.log(loggedInUser)
  res.render("index" , { user: loggedInUser });
});

module.exports = router;


