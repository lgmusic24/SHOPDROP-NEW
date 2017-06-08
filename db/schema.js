var mongoose = require('./connection')

var ItemSchema = new mongoose.Schema(
  {
     name: String,
     designer: String,
     portfolio: String,
     photo_url: String,
     price: Number
  }
);

mongoose.model("Item", ItemSchema);

module.exports = mongoose
