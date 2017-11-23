var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR =10;

var UserSchma = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    //0:mormal user
    //1:verified user
    //2:professional user
    //>10:admin
    //>50:super admin
    role:{
        type:Number,
        default:0
    },
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
UserSchma.pre('save',function(next){
    var user = this;

    if(this.isNew){//判断数据是否是新加的
        this.meta.createAt=this.meta.updateAt=Date.now();//是的话，就把创建时间和更新时间设置为当前时间
    }else{
        this.meta.updateAt=Date.now();//否则，只修改更新时间
    }
    //生成随机的盐,第一个参数是计算强度,此处为10，第二个参数是回调，拿到加盐后的值
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });

    });
});

//实例方法，通过实例调用
UserSchma.methods={
    comparePassword:function(_pasword,cb){
        bcrypt.compare(_pasword,this.password,function(err,isMatch){
            if(err){
                return cb(err);
            }
            cb(null,isMatch);
        })
    }
}

//静态方法
//不会直接与数据库进行交互，只有经过Model编译并且实例化后，才会具有这些方法
UserSchma.statics={
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
module.exports=UserSchma;