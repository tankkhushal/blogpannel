const Blog = require('../model/BlogModel')
const Category = require('../model/CategoryMedel')
const CommentModel = require("../model/CommentModel")
const User = require('../model/Usermodel')
const { viewBlog } = require('./BlogCtl')

module.exports.Home = async (req,res)=>{
    try{
        let BlogData = [];
        let search ='';
        let CategoryData = await Category.find({status :true})
        if(req.query.homesearch){
            search = req.query.homesearch
        }
        if(req.query.catid){
            BlogData= await Blog.find({categoryId:req.query.catid,
            categoryId : req.query.catid,
            status: true,
            $or: [
                {title:{$regex:search}},
                 {author:{$regex:search}},
                  {description:{$regex:search}}
            ]
        });
        }
        else{
             BlogData = await Blog.find()
        }
        res.render('Home',{
            CategoryData,
            BlogData,
            search
        });
    }
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}

module.exports.readmore = async(req,res)=>{
    try{
       let postid = req.params.id;
        let CategoryData = await Category.find({status :true})
        let BlogData  = await Blog.findById(req.params.id)
        let Viewcomment = await CommentModel.find()

     return res.render('newhome',{
        CategoryData,BlogData,postid,Viewcomment
     })
    }
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.addcomment = async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.file)
        
        let imgpath = ''
        if (req.file) {
            imgpath = await CommentModel.imgpath + '/' + req.file.filename;
        }
        req.body.image = imgpath;

        let addcom = await CommentModel.create(req.body)       
        if(addcom){
            let blogdetails = await Blog.findById(req.body.postid)
            blogdetails.commentId.push(addcom._id)
            await Blog.findByIdAndUpdate(req.body.postid,blogdetails)
            return res.redirect('back',
                {
                    addcom  
                }
            )
        }

     }
    
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.Viewcomment = async(req,res)=>{
    try{
       
        let Viewcomment = await CommentModel.find()      
        if(Viewcomment){
           return res.render('Viewcomment',{
            Viewcomment
           })
        }
        else{
            console.log(err)
            return res.redirect('back')
        }

     }
    
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.activecomment = async(req,res)=>{
    try{
        console.log(req.query);
        let activecomment = await CommentModel.findByIdAndUpdate(req.query.catId,{'status':false});
        if(activecomment){
            return res.redirect('back');
        }
        else{
            console.log('Failed to update status')
            return res.redirect('back');
        }

     }
    
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.deactivecomment = async(req,res)=>{
    try{
        console.log(req.query);
        let deactivecomment = await CommentModel.findByIdAndUpdate(req.query.catId,{'status':true});
        if(deactivecomment){
            return res.redirect('back');
        }
        else{
            console.log('Failed to update status')
            return res.redirect('back');
        }
       
     }
    
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.UserRagisterdata =async(req,res)=>{
    try{
         console.log(req.body)
        if(req.body.password == req.body.cpassword){
            let userdata = await User.create(req.body)
             if(userdata){
                console.log(userdata)
                 console.log("user register susscefully")
                console.log("userData --> ", userdata);
                return res.redirect('back')
            }
            else{
                console.log("user register error")
                return res.redirect('back')
            }
        }
    }
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.UserLogindata =async(req,res)=>{
    try{
        return res.redirect('/')
    }
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}


module.exports.userlike = async(req,res)=>{
    try{
        console.log(req.params.commentId);
        let singelcomment = await CommentModel.findById(req.params.commentId)
        if(singelcomment){
            console.log(req.user._id)
            let likeuseralrediyexit = singelcomment.like.includes(req.user._id);
            if(likeuseralrediyexit){
                let newdata = singelcomment.like.filter((v , i)=>{
                    console.log(v)
                    console.log(req.user._id)
                    if(!v.equals(req.user._id)){
                        return v;
                    }
                    console.log(singelcomment)
                    singelcomment.like = newdata;
                })
                await CommentModel.findByIdAndUpdate(req.params.commentId.singelcomment)
                return res.redirect('back')
            }
            else{

                singelcomment.like.push(req.user._id)
                await CommentModel.findByIdAndUpdate(req.params.commentId.singelcomment)
                return res.redirect('back')
            }
        }
    }
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}