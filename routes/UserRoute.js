const express = require('express');
const Router = express.Router();
const UserCtl = require('../controller/UserCtl');
const routes = require('./Adminroutes');
const CommentModel = require("../model/CommentModel")
const passport = require('passport')

Router.get('/UserRagister', async(req,res)=>{
    return res.render("UserRagister")
})

Router.get('/UserLogin', async(req,res)=>{
    return res.render("UserLogin")
})
Router.post("/")

Router.get('/',UserCtl.Home)
 
Router.get('/readmore/:id',UserCtl.readmore)

Router.post("/addcomment" ,CommentModel.uploadImage, UserCtl.addcomment)

Router.get("/Viewcomment",UserCtl.Viewcomment)

Router.get("/activecomment",UserCtl.activecomment)

Router.get("/deactivecomment",UserCtl.deactivecomment)

Router.post("/UserRagisterdata", UserCtl.UserRagisterdata)

Router.post("/UserLogindata", UserCtl.UserLogindata)

 Router.get('/userlike/:commentid',UserCtl.userlike)


module.exports = Router;
