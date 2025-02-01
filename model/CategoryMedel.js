const mongoose = require('mongoose');
const CategorySchema  = mongoose.Schema({
    category : {
        type:String,
        required: true
    },
    status : {
        type: Boolean,
        default: true
    },
    blogid : [
        {
            type: mongoose.Schema.Types.ObjectId,
                ref: 'blog',
        }
    ]
},{
    timestamps : true
})

const Category = mongoose.model('Category',CategorySchema)

module.exports = Category