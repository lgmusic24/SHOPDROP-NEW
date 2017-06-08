var Schema = require("../db/schema.js")
var Item = Schema.Item;

var WelcomeController = {
  index() {
    Welcome.find({} (err, items) => {
      console.log(items);
    });
   }
show(req){
    Item.findOne({name: req.name}, (err,item) =>{
      console.log(item)
    });
  }
};
