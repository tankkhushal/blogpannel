const express = require('express')
const port = 8009;
const path = require('path')
const app = express();

const cookieparser = require('cookie-parser')

// const db = require('./config/mongoose')

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tankkhushal001:jqduBeW23anGBvrl@cluster0.qkwdt.mongodb.net/Adminpanelback').then((res) => {
    console.log('db is connected');
})
.catch((err) =>{
    console.log('db is not connected');
})

const session = require('express-session')
const passport = require('./config/Passport-Local')
const LocalStrategy = require('./config/Passport-Local');
const { connect } = require('http2');

const flash = require('connect-flash')
const FlashMassage = require("./config/FlashMassage")


app.use(express.urlencoded());
app.use(cookieparser())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname,'assets')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(session({
    name:'khushal',
    secret:'kkey',
    resave : false,
    SaveUninitialized :false,
    cookie :{
        MaxAge : 1000*60*60
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);
app.use(flash());
app.use(FlashMassage.setflash)
app.use('/',require('./routes/Adminroutes'))

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('server has been started')
})