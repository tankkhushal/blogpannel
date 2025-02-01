const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer')
const Imagepath = '/uploads'

const CommentSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    } ,
      status : {
        type: Boolean,
        default: true
    },
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }
}, {
    timestamps: true
})


const commentdata = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', Imagepath))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

CommentSchema.statics.uploadImage = multer({ storage: commentdata }).single('image');
CommentSchema.statics.imgpath = Imagepath

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment;