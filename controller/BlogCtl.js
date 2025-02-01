const Blog = require('../model/BlogModel')
const Category =  require('../model/CategoryMedel');
module.exports.addBlog = async (req, res) => {
    try {
        let categoryList = await Category.find()
        return res.render('AddBlog',{
            categoryList
        });
    }
    catch (err) {
        return res.redirect('back');
    }
}
module.exports.insertBlog = async (req, res) => {
    try {
        console.log(req.body);
        let AddBlog = await Blog.create(req.body);
        if (AddBlog) {
            let findcategory = await Category.findById(req.body.categoryId);
            findcategory.blogid.push(this.addBlog._id);
            await Category.findByIdAndUpdate(req.body.categoryId,findcategory);
            // console.log('Blog added successfully')
            req.flash('success',"Blog added successfullyy");
            return res.redirect('back');
        }
        else {
            console.log('Failed to add Blog')
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}

module.exports.viewBlog = async (req, res) => {
    try {
        let ViewBlog = await Blog.find().populate('categoryId').exec();
        console.log(ViewBlog);
        
        return res.render('ViewBlog',{
            ViewBlog
        });
    }
    catch (err) {
        return res.redirect('back');
    }
}
module.exports.deleteBlogData = async (req, res) => {
    try {
        console.log(req.params.id);

        await Blog.findByIdAndDelete(req.params.id);
        req.flash('success',"category delete successfully");
        return res.redirect('back')
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.UpdateBlog = async (req, res) => {
    try {
        console.log(req.params.id);
        let UpdateBlogRecord = await Blog.findById(req.params.id);
        if (UpdateBlogRecord) {
            res.render('UpdateBlog', {
                UpdateBlogRecord
            });
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.editBlogData = async (req, res) => {
    try {
        let BlogData = await Blog.findById(req.body.id)
        if(BlogData){
            await Blog.findByIdAndUpdate(req.body.id,req.body)
            req.flash('success',"category adit successfully");
            res.redirect('/Blog/viewblog')
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}