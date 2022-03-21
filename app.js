//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var l = require('lodash');
const mongoose = require('mongoose');
const app=express();
app.set('view engine', 'ejs');

//connect to MongoDB by specifying port to access MongoDB server
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://mansi:out123@cluster0.qg0yo.mongodb.net/BlogDB');
  }



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const  postSchema =new mongoose.Schema({
  title: String,

  content: String
});
// making collection
const Post = mongoose.model("Post", postSchema);
const post=new Post({
  title:"Day 1",
  content:"Today is a new day"
});
//post.save();

const homeStartingContent = "Hi! Welcome to my Blog Website.";
const aboutContent = "I am Aditi shukla.Use this blog website to write all the things that comes to your Mind";
const contactContent = "Contact me at aditi.shukla0111@gmail.com";




//var posts=[];

app.get("/",function(req,res){

  Post.find({},function(err,foundItems){
    if(err)
    {
      console.log(err);

    }
    else{
      res.render("home",{p1:homeStartingContent,pp:foundItems});
    }
  })
  
   
  
});
app.get("/about",function(req,res){
   res.render("about",{p2:aboutContent});
 });
 app.get("/contact",function(req,res){
  res.render("contact",{p3:contactContent });
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
//  const post={
//    title:req.body.Title,
//    con:req.body.Posted
//  }
// posts.push(post);
// res.redirect("/")
const post=new Post({
  title:req.body.Title,
  content:req.body.Posted
});
post.save(function(err){
  if(!err){
    res.redirect("/");
  }
  else{
    console.log("error in saving post");
  }
});

});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        Topic: post.title,
        para: post.content,
        pp:post._id
      });
    });
  
  });

  app.post("/delete",function(req,res){
    const checkedItemID=req.body.check;
      Post.deleteOne({_id:checkedItemID},function(err){
        if(!err)
        {
          console.log("success in deleting");
          res.redirect("/");
        }
      });
      
  });
  
  


  let port = process.env.PORT;
  app.listen(port  || 3000,function(){
      console.log("Server is running on port 3000 and dynamic port");
  });