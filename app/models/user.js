var mongoose=require('mongoose');
var UserSchema = require('../schemas/user');//引入模式文件
var User=mongoose.model('User',UserSchema);//编译生成Movie模型

//导出构造函数
module.exports=User;