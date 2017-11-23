var mongoose=require('mongoose');
var CommentSchema = require('../schemas/comment');//引入模式文件
var Comment=mongoose.model('Comment',CommentSchema);//编译生成Movie模型

//导出构造函数
module.exports=Comment;