const { model } = require('mongoose');
const Category = require('../model/CategoryMedel')

module.exports.category = (req, res) => {
    try {
        return res.render('AddCategory');
    }
    catch (err) {
        return res.redirect('back');
    }
}
module.exports.insertCategory = async (req, res) => {
    console.log(req.body);
    try {
        await Category.create(req.body)
        req.flash('success',"category add successfully");
        return res.redirect('back')
    }
    catch (err) {
        console.log(err);
        return res.render('back');
    }
}
module.exports.viewCategory = async (req, res) => {
    try {
        let search = ''
        if (req.body.search) {
            search = req.params.search;
        }
        const category = await Category.find().sort({category : -1});
        return res.render('ViewCategory', {
            category
        });
    } catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}

module.exports.deleteData = async (req, res) => {
    try {
        console.log(req.params.id);

        await Category.findByIdAndDelete(req.params.id);
        req.flash('success',"category delete successfully");
        return res.redirect('back')
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.UpdateCategory = async (req, res) => {
    try {
        console.log(req.params.id);
        let UpdateCategoryRecord = await Category.findById(req.params.id);
        if (UpdateCategoryRecord) {
            res.render('UpdateCategory', {
                UpdateCategoryRecord
            });
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.editCategoryData = async (req, res) => {
    try {
        let categoryData = await Category.findById(req.body.id)
        if(categoryData){
            await Category.findByIdAndUpdate(req.body.id,req.body)
            req.flash('success',"category updet successfully");
            res.redirect('/category/viewCategory')
        }
    }
    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}


module.exports.deleteMultipleCategory = async (req,res) =>{
    try{
        console.log(req.body.Ids);
        let categoryDelete = await Category.deleteMany({_id : {$in : req.body.Ids}});
        if(categoryDelete){
            req.flash('success',"category alldelete successfully");
            res.redirect('back');
        }
        else{
            console.log('Failed to delete')
            res.redirect('back');
        }
    }
    catch(err){
        console.log(err)
        return res.redirect('back');
    }
}

module.exports.changeStatus = async (req,res)=>{
    try{
        console.log(req.query);
        let catStatusUpdate = await Category.findByIdAndUpdate(req.query.catId,{'status':false});
        if(catStatusUpdate){
            return res.redirect('back');
        }
        else{
            console.log('Failed to update status')
            return res.redirect('back');
        }

    }
    catch(err){
        console.log(err)
        return res.redirect('back');
    }
}


module.exports.changeStatusTrue = async (req,res) =>{
    try{
        console.log(req.query);
        let catStatusUpdate = await Category.findByIdAndUpdate(req.query.catId,{'status':true});
        if(catStatusUpdate){
            return res.redirect('back');
        }
        else{
            console.log('Failed to update status')
            return res.redirect('back');
        }

    }   
    catch(err){
        console.log(err)
        return res.redirect('back');
    }
}