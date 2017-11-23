var mongoose=require('mongoose');
var CategorySchema = require('../schemas/category');//引入模式文件
var Category=mongoose.model('Category',CategorySchema);//编译生成Movie模型

//导出构造函数
module.exports=Category;