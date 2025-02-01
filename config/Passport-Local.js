const passport = require('passport')
const LocalStrategy = require('passport-local')
const AdminModel = require('../model/adminmodel')
const user = require("../model/Usermodel")

passport.use('local',new LocalStrategy({
    usernameField : 'email'
},async function (email,password,done){
    console.log("Middleware");
    console.log(email,password);
    let AdminData = await AdminModel.findOne({email:email})
    if(AdminData){
        if(AdminData.password == password){
            return done(null,AdminData);
        }else{
            return done(null,false);
        }
    }   
    else{
        return done(null,false);
    }

}))

passport.serializeUser(function(user,done){
    return done(null,user.id)
})
passport.deserializeUser(async function(id,done){
    let AdminRecord = await AdminModel.findById(id);
    if(AdminRecord){
        return done(null,AdminRecord);
    }
    else{
        return done(null,false);
    }
})

passport.setAuthUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}
passport.checkAuthUser = function(req,res,next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        return res.redirect('/');
    }
}



module.exports = passport