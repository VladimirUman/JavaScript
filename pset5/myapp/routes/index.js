var express = require('express');
var router = express.Router();
var fs = require('fs');
var twitter = require('twitter');
var config = require('./../config.json');
var client = new twitter(config.twitter);
var twit_texts;

/* GET home page. */
router.get('/', function(req, res, next) {
  var userLst = fs.readFileSync('users.csv', 'utf8').toString().split('\n');
  userLst.pop();
  res.render('index', { users: userLst });
  /*client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
    if(error) throw error;
    //console.log(tweet);  // Tweet body.
    //console.log(response);  // Raw response object.
  });*/
});

module.exports = router;
