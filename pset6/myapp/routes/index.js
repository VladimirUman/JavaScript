var express = require('express');
var router = express.Router();
var fs = require('fs');
var twitter = require('twitter');
var config = require('./../config.json');
var client = new twitter(config.twitter);
var twit_texts;
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/usersdb";

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db){
    db.collection("users").find({}).toArray(function(err, users){
      //console.log(users);
      res.render('index', { useros: users });
      db.close();
    });
  });
});

router.get('/add', function(req, res, next) {
  res.render('Add');
});


function getNextSequence(name, callback) {
  MongoClient.connect(url, function(err, db){
    db.collection("counters").findAndModify( { _id: name }, null, { $inc: { seq: 1 } }, function(err, result){
        if(err) callback(err, result);
        callback(err, result.value.seq);
    });
    db.close();
  });
}

router.post('/add', function(req, res, next) {
  getNextSequence("userid", function(err, result){
    if(!err){
      var user = {
        "user_id": result,
        "name" : req.body.firstname,
        "surname" : req.body.lastname,
        "twitter" : req.body.twitname
      };
      MongoClient.connect(url, function(err, db){
        db.collection("users").insertOne(user, function(err, result){
          res.redirect('/');
          db.close();
          var userStatus = 'Hello, ' + req.body.firstname + ' ' + req.body.lastname + ', ' + req.body.twitname + '. Your id is ' + user.user_id + '.';
          console.log(userStatus);
          client.post('statuses/update', {status: userStatus},  function(error, tweet, response) {
            if(error) throw error;
          });
        });
      });
    }
  });
});

module.exports = router;
