var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/usersdb";
MongoClient.connect(url, function(err, db){
  db.collection("counters").updateOne({ _id: "userid"}, { $set: { seq: 0 }});
  db.close();
});
