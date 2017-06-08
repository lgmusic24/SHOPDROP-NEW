var express= require("express");
var hbs = require("hbs");
var parser = require("body-parser");
var mongoose = require("./db/schema");

var app = express();

var Item = mongoose.model("Item")

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");


// @@ -15,6 +16,7 @@ app.engine(".hbs", hbs({
//   defaultLayout: "layout-main"
// }));
app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

app.get("/", function(req,res){
  res.render("index");
});

app.get("/items",function(req,res){
  Item.find({}).then(function(items){
    res.json("items")
   });
 });


// app.post("/items", function(req,res){
//   res.json(req.body);


app.put("/items/:name", function(req,res){
  Item.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(item){
  res.json(item);
  })
 });

app.get("/items/:name", (req, res) => {
  Item.findOne(req.params).then(function(item) {
    res.json(item);
  })
})


app.post("/items",(req, res) => {
  Item.create(req.body).then(function(item) {
    res.json(item);
  })
})

app.put("/items/:name", (req, res) => {
  Item.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(item){
    res.json(item);
    })
  })

app.delete("/item/:name",(req, res) => {
  Item.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true})
  })
})


app.listen(app.get("port")), function(){
  console.log("it's aliiive")
}
