var express = require('express');
var router = express.Router();
var fs = require('fs');

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
  var user = req.body.firstname + ';' + req.body.lastname + ';\n';
  fs.appendFileSync('users.csv', user, 'utf8');
  res.redirect('/users');

});

module.exports = router;
