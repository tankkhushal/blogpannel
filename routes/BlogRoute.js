const express = require('express');
const BlogCtl = require('../controller/BlogCtl')
const route = express.Router();

route.get('/', BlogCtl.addBlog)
route.post('/insertBlog', BlogCtl.insertBlog)

route.get('/viewblog', BlogCtl.viewBlog)
route.get('/deleteBlogData/:id',BlogCtl.deleteBlogData)
route.get('/UpdateBlog/:id',BlogCtl.UpdateBlog)
route.post('/editBlogData',BlogCtl.editBlogData);
module.exports = route;