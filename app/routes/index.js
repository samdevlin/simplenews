var express = require('express');
const {getHomepageData} = require("../controllers/homepage.controller");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = await getHomepageData();
  console.log(data);
  res.render('index', {data: data});
});

module.exports = router;
