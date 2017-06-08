var mongoose = require('./schema')
var Item = mongoose.model('Item')
var seedData = require('./seeds.json')

Item.remove({}).then(function(){
  Item.collection.insert(seedData).then(function(){
    process.exit();
  });
});
