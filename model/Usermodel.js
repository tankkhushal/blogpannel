const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    userpassword: {
        type:String ,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    like:[
        {
            type :mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    dislike:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
         
})

const User = mongoose.model('User', UserSchema)

module.exports = User