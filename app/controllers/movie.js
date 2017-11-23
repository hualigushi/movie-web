//电影控制器
var Movie=require('../models/movie');//引入movie模型文件
var Comment=require('../models/comment');
var Category=require('../models/category');
var fs = require('fs');
var path = require('path');

//存储海报
exports.savePoster=function(req,res,next){
    var posterData = req.files.uploadPoster;
    var filePath = posterData.path;
    var originalFilename = posterData.originalFilename;

    if(originalFilename){
        fs.readFile(filePath,function(err,data){ //读取文件
            var timestamp = Date.now();//时间戳
            var type = posterData.type.split('/')[1];//文件类型
            var poster = timestamp+'.'+type;//新的名称
            var newPath = path.join(__dirname,'../../public/upload/'+poster);//将上传的海报存到public下
            fs.writeFile(newPath,data,function(err){ //存储文件
                if(err){
                    console.log('upload');
                    console.log(err);
                }

                req.poster = poster;
                next();
            })
        })
    }else{//没有文件上传
        next();
    }
}

//从表单提交的数据的存储处理
exports.save=function(req,res){
    var id=req.body.movie._id;//判断是新增的数据还是修改的数据
    var movieObj=req.body.movie;
    var _movie;

    if(req.poster){ //上一个步骤存储好了海报
        movieObj.poster = req.poster;//重写海报地址
    }

    if(id){//修改的数据
        Movie.findOneAndUpdate({ _id: id},movieObj,function(err,movie){
            if(err){
                console.log(err);
            }
            //更新成功后，页面跳转到电影的详情页
            res.redirect('/movie/'+movie._id);
        });
    }else{
        _movie=new Movie(movieObj);
        console.log(movieObj);
        var categoryId=movieObj.category;
        var categoryName=movieObj.categoryName;

        _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }

            //选择了分类
            if(categoryId){
                //更新成功后，页面跳转到电影的详情页
                Category.findById(categoryId,function(err,category){
                    category.movies.push(movie._id);
                    category.save(function(err,category){
                        res.redirect('/movie/'+movie._id);
                    });
                });
            }else if(categoryName){//新增分类
                var category = new Category({
                    name:categoryName,
                    movies:[movie._id]
                });
                category.save(function(err,category){
                    movie.category=category._id;
                    movie.save(function(err,movie){
                        res.redirect('/movie/'+movie._id);
                    });
                });
            }
        });
    }
};

//detail page
exports.detail=function(req,res){
    var id=req.params.id;
    Movie.findById(id,function(err,movie){
        //更新访问量
        Movie.update({_id:id},{$inc:{pv:1}},function(err){
            if(err)
                console.log(err);
        });
        Comment
            .find({movie:id})
            .populate('from','name')
            .populate('reply.from','name')
            .populate('reply.to','name')
            .exec(function(err,comments){
                console.log(comments);
                res.render('detail',{
                    title: 'imooc '+movie.title,
                    movie: movie,
                    comments:comments
                });
        })

    })

};

//admin page
exports.new=function(req,res){
    Category.find({},function(err,categories){
        res.render('admin',{
            title: 'imooc 后台录入页',
            movie: {},
            categories:categories
        });
    });

};

//更新电影，从列表页的更新跳转过来
exports.update=function(req,res){
    var id=req.params.id;
    if(id){
            Movie.findById(id,function(err,movie){
                Category.find({},function(err,categories){
                //将查询到数据渲染后台录入页
                res.render('admin',{
                    title:'后台更新页',
                    movie:movie,
                    categories:categories
                });
            });
        });
    }
};

//list page
exports.list=function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);//打印错误
        }
        //用查询到的数据列表渲染首页
        res.render('list',{
            title:'imooc 列表页',
            movies:movies
        });
    });
};

//list delete movie
exports.del=function(req,res){
    var id = req.query.id;
    if(id){
        Movie.remove({_id:id},function(err){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        });
    }
};