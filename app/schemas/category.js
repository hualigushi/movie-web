var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema=new Schema({
    name:String,
    movies:[{type:ObjectId,ref:'Movie'}],//这个分类下电影ObjectId
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

//每次在存储数据之前都会调用此方法
CategorySchema.pre('save',function(next){
    if(this.isNew){//判断数据是否是新加的
        this.meta.createAt=this.meta.updateAt=Date.now();//是的话，就把创建时间和更新时间设置为当前时间
    }else{
        this.meta.updateAt=Date.now();//否则，只修改更新时间
    }

    next();//继续存储流程
});

//静态方法
//不会直接与数据库进行交互，只有经过Model编译并且实例化后，才会具有这些方法
CategorySchema.statics={
    //取出数据库中所有的数据
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')//按照更新时间排序
            .exec(cb);//执行回调方法
    },
    //查询单条数据
    findById:function(id,cb){
        return this.
            findOne({_id:id})
            .exec(cb);

    }
}

//导出模式
module.exports=CategorySchema;
