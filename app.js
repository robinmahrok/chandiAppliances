//jshint esversion:6
require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const saltRounds=10;
/*
LEVEL 3 Encryption
const md5 = require('md5');
md5(req.body.username)
*/


const app=express();
app.use(express.static("public"));

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret:"Our little secret.",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://admin-sanket:sj1998@cluster0-y7j5u.mongodb.net/usersDB", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const userSchema = new mongoose.Schema({
  email:String,
  password:String
});

const submitSchema = new mongoose.Schema({
  name:String,
  sapid:Number
});

userSchema.plugin(passportLocalMongoose);

/*
LEVEL 2 encryption
userSchema.plugin(encrypt, {secret:process.env.SECRET, encryptedFields: ["password"]});
*/

const User= mongoose.model("User",userSchema);
const Submit= mongoose.model("Submit",submitSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
  res.render("home");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.get("/logout", function(req,res){
req.logout();
  res.redirect("/");
});

app.get("/register", function(req,res){
  res.render("register");
});

app.get("/submit", function(req,res){
  res.render("submit");
});

app.get("/about", function(req,res){
  res.render("about");
});
app.get("/contact", function(req,res){
  res.render("contact");
});
app.get("/academics", function(req,res){
  res.render("academics");
});

app.get("/secrets", function(req,res){
if(req.isAuthenticated()){
  res.render("secrets");
}
else{
  res.redirect("/login");
}
});

app.post("/register", function(req,res){

User.register({username:req.body.username}, req.body.password, function(err,user){
  if(err){
    console.log(err);
    res.redirect("/register");
  }
  else{
    passport.authenticate("local")(req,res,function(){
res.redirect("/secrets");
});
  }
});
});

app.post("/login", function(req,res){
const user= new User({
  username:req.body.username,
  password:req.body.password
});
req.login(user, function(err){
  if(err){
    console.log(err);
  }
  else{
    passport.authenticate("local")(req,res,function(){
res.redirect("/secrets");
});
  }
});
});


app.post("/submit", function(req,res){
Submit.findOne({sapid:req.body.Sapid},function(err,foundsubmit){
if(!foundsubmit){
  const newSubmit=new Submit({
    name: req.body.Name,
    sapid: req.body.Sapid
  });
  newSubmit.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.render("secrets");
    }
  });
}
else{
  res.redirect("secrets");
}


});

});




















/*app.post("/register", function(req,res){

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

    const newUser=new User({
      email: req.body.username,
      password: hash
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        res.render("secrets");
      }
    });

  });
});
*/



/*app.post("/login", function(req,res){
const username=req.body.username;
  /*const password=md5(req.body.password);
  const password=req.body.password;

  User.findOne(function(err,foundUser){
    if(err){
      console.log(err);
}
else{
    bcrypt.compare(password,foundUser.password, function(err, result) {
      if(!err){
        res.render("secrets");
        console.log("true password");
      }
});

}

});
});
*/


















































app.listen(3000,function(){
  console.log("Server running at port 3000");
});






/*if(err){
  console.log(err);
}
if(foundUser){
if(foundUser.email===username){
  bcrypt.compare(password,foundUser.password, function(err, result) {
    if(result===true){
      res.render("secrets");
    }
    else{
      console.log("Wrong Password")
res.render("login");
    }
});

}
else{
  console.log("Wrong Username")
  res.render("login");
}
}
});
*/
