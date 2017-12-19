// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get('/',function(req,res){
    res.redirect('/burgers');
  })
  
  app.get("/burgers", function(req, res) {
    db.Burger.findAll({}).then(function(results){
      var hbsObject={burgers: results};
      console.log(hbsObject.burgers[0].dataValues);
        res.render('index',hbsObject);
    })
  });

  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/burgers/", function(req, res) {
    var name=req.body.name;
    db.Burger.create({
      burger_name: name,
    }).then(function(dbTodo) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTodo);
    })

  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/burgers/:id", function(req, res) {
    var name=req.params.id;
    db.Burger.update({
      devoured:true
    },{
      where:{id:name}
    }).then(function(results){
      res.json(results);
    })
  });
};
