var express = require('express');
var router = express.Router();

var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  sess=req.session;
console.log(sess);
  res.render('secret', { title: 'SECRET' ,session: req.session});
});

module.exports = router;
