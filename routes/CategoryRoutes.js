const express = require('express');
const CategoryCtl = require('../controller/CategoryCtl')
const route = express.Router();

route.get('/',CategoryCtl.category)
route.post('/insertCategory',CategoryCtl.insertCategory)

route.get('/viewCategory',CategoryCtl.viewCategory)
route.get('/deleteData/:id',CategoryCtl.deleteData)
route.get('/UpdateCategory/:id',CategoryCtl.UpdateCategory)
route.post('/editCategoryData',CategoryCtl.editCategoryData);
route.post("/deleteMultipleCategory", CategoryCtl.deleteMultipleCategory);
route.get("/changeStatus", CategoryCtl.changeStatus);

route.get("/changeStatusTrue", CategoryCtl.changeStatusTrue);



module.exports = route;