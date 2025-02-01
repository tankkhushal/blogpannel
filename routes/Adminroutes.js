const express = require('express');
const routes = express.Router();

const adminclt = require('../controller/adminclt')

const Adminmodel = require('../model/adminmodel');
const passport = require('../config/Passport-Local')

const {check} = require('express-validator');
const Admin = require('../model/adminmodel');

console.log('admin routes')

routes.get('/dashboard',adminclt.dashboard)

routes.get('/addAdmin',adminclt.addAdmin)

routes.post('/insertdata',Adminmodel.uploadImage,[
   check('fname').notEmpty().withMessage("first fname is require").isLength({min:2}).withMessage("minimam 2 charecter is require"),
   check('lname').notEmpty().withMessage("first lname is require").isLength({min:2}).withMessage("minimam 2 charecter is require"),
   check('email').notEmpty().withMessage("first lname is require").isEmail().withMessage("minimam 2 charecter is require ").custom(async(value)=>{
    let checkemail = await Adminmodel.find({email:value}).countDocuments();
    if(checkemail>0){
        throw new error('admin olrediy exist')
    }
   }),
   
   check('password','...').notEmpty().withMessage("possword is require").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("one lowercase , one oper case , miniman 8 carecter reqiure"),

   check('gender').notEmpty().withMessage("select gender"),
   check('message').notEmpty().withMessage("select message"),
   check('hobby').notEmpty().withMessage("select hobby"),
   check('city').notEmpty().withMessage("select hobby"),

],adminclt.insertdata)

routes.get('/viewdata',adminclt.viewdata)

routes.get('/delData',adminclt.delData)

routes.get('/updateData/:id',adminclt.updateData)

routes.post('/editdata',Adminmodel.uploadImage,adminclt.editdata)

routes.get('/myprofile',adminclt.myprofile)

//login 
routes.use('/',require('../routes/UserRoute'))
routes.get('/login',adminclt.login);
routes.post('/logindata',passport.authenticate('local',{failureRedirect:'/login'}),adminclt.logindata)


//logout 
routes.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            return false;
        }
        return res.redirect('/login')
    })
})


// change password

routes.get('/changepass',adminclt.changepass)
routes.post('/changepassword',adminclt.changepassword)

// forgot password
routes.get('/forgotpass',adminclt.forgotpass)
routes.post('/forgotpassword',adminclt.forgotpassword)

routes.get('/checkotp',adminclt.checkotp);
routes.post('/verifyotp',adminclt.verifyotp)

routes.get('/retypepass',adminclt.retypepass)
routes.post('/verifypass',adminclt.verifypass)

routes.use('/category',require('../routes/CategoryRoutes'));
routes.use('/Blog',require('../routes/BlogRoute'));

module.exports = routes