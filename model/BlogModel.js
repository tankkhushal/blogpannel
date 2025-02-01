const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    blogtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    commentId:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }
]
}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog