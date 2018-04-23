var express = require('express');
var router = express.Router();
var fs = require('fs');
var twitter = require('twitter');
var config = require('./../config.json');
var client = new twitter(config.twitter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  var userLst = fs.readFileSync('users.csv', 'utf8').toString().split('\n');
  userLst.pop();
  res.render('userList', { users: userLst });
});

router.get('/add', function(req, res, next) {
  res.render('userAdd');
});

router.post('/add', function(req, res, next) {
  var userLst = fs.readFileSync('users.csv', 'utf8').toString().split('\n');
  var userId = Number(userLst[userLst.length - 2].split(';')[0]) + 1;
  var user = userId + ';' + req.body.firstname + ';' + req.body.lastname + ';' + req.body.twitname + ';\n';
  fs.appendFileSync('users.csv', user, 'utf8');
  res.redirect('/');
  var userStatus = 'Hello, ' + req.body.firstname + ' ' + req.body.lastname + ', ' + req.body.twitname + '. Your id is ' + userId + '.';
  console.log(userStatus);
  client.post('statuses/update', {status: userStatus},  function(error, tweet, response) {
    if(error) throw error;
    //console.log(tweet);  // Tweet body.
    //console.log(response);  // Raw response object.
  });

});

module.exports = router;
