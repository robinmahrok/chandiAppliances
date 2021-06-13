//jshint esversion:6
require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _ = require('lodash');


const app=express();
app.use(express.static("public"));

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.render("home");
});

app.get("/home", function(req,res){
  res.render("home");
});

app.get("/web-security", function(req,res){
  res.render("web-security");
});

app.get("/network-security", function(req,res){
  res.render("network");
});

app.get("/services", function(req,res){
  res.render("services");
});

app.get("/mobileapplication-security", function(req,res){
  res.render("masec");
});

app.get("/training", function(req,res){
  res.render("training");
});
app.get("/cyber-forencics", function(req,res){
  res.render("cyber-forensics");
});
app.get("/ps", function(req,res){
  res.render("ps");
});

app.get("/feedback", function(req,res){
  res.render("feedback");
});

app.post("/addFeedback", function(req,res){
 

  
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("Server has started succesfully");
});
