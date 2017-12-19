var express=require("express");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var exphbs=require("express-handlebars");
//var mysql = require('mysql');
var PORT=process.env.PORT || 8080;
var app=express();
var db = require("./models");

//var routes=require("./controller/burgers_controller.js");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.text()); //also new
app.use(bodyParser.json({ type: "application/vnd.api+json" })); //also new

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
require("./routes/api-routes.js")(app); //new from sequelize set up


//app.use("/",routes);
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});