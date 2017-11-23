//用户控制器
var User=require('../models/user');//引入user模型文件

//显示登录页面
exports.showSignin = function(req,res){
    res.render('signin',{
        title:'登录页面'
    });
}

//显示注册页面
exports.showSignup = function(req,res){
    res.render('signup',{
        title:'注册页面'
    });
}

//注册
exports.signup = function(req,res){
    var _user = req.body.user;
    var users = new User(_user);

    User.findOne({name:_user.name},function(err,user){
        if(err){
            console.log(err);
        }
        if(user){
            return res.redirect('/signin');
        }else{
            users.save(function(err,user){
                if(err){
                    console.log(err);
                }
                res.redirect('/');
            });
        }
    });
}

//登录
exports.signin=function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password=_user.password;

    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup');
        }

        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){
                req.session.user=user;
                return res.redirect('/');
            }else{
                return res.redirect('/signin');
            }

        });
    });
};

//登出
exports.logout=function(req,res){
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
};

//userlist page

exports.list=function(req,res){
    User.fetch(function(err,users){
        if(err){
            console.log(err);//打印错误
        }
        //用查询到的数据列表渲染首页
        res.render('userlist',{
            title:'imooc 用户列表页',
            users:users
        });
    });
};

//登录中间件
exports.signinRequired=function(req,res,next){
    var user = req.session.user;

    if(!user){
        return res.redirect('/signin');
    }

    next();
};

//管理员中间件
exports.adminRequired=function(req,res,next){
    var user = req.session.user;

    if(!user.role || user.role <=10){
        return res.redirect('/signin');
    }

    next();
};