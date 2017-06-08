var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/shopdrop")

var db = mongoose.connection;

db.on('error', err => {
  console.log(err);
});

db.once('open', () => {
  console.log("database has been connected")
});

module.exports = mongoose;
