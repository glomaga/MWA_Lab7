var express = require('express');
var router = express.Router();
var mongo=require("mongoskin");
var db= mongo.db("mongodb://localhost:27017/homework7", {native_parser:true});
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes256', 'asaadsaad');

var sess;
var message_decrypted;

db.collection('homework7').findOne({}, function(err, result) {
   if (err) throw err;
console.log(result.message);
const encrypted =result.message;
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
message_decrypted= decrypted;
db.close();
});

/* GET home page. */
router.get('/', function(req, res, next) {
sess = req.session;
sess.message = message_decrypted;
console.log(sess);
    res.redirect('secret'); 
});


module.exports = router;
