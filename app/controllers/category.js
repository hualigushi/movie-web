//电影控制器
var Category=require('../models/category');//引入模型文件

//从表单提交的数据的存储处理

exports.save=function(req,res){
    var _category=req.body.category;
    var category=new Category(_category);

    category.save(function(err,category){
        if(err){
            console.log(err);
        }
        res.redirect('/admin/category/list');
    });

};

//detail page
/*exports.detail=function(req,res){
    var id=req.params.id;
    Movie.findById(id,function(err,movie){
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
*/

//admin page
exports.new=function(req,res){
    res.render('category_admin',{
        title: 'imooc 后台分类录入页',
        category:{}
    });
};

//更新电影，从列表页的更新跳转过来
/*exports.update=function(req,res){
    var id=req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            //将查询到数据渲染后台录入页
            res.render('admin',{
                title:'后台更新页',
                movie:movie
            });
        })
    }
};*/

//list page
exports.list=function(req,res){
    Category.fetch(function(err,categories){
        if(err){
            console.log(err);//打印错误
        }
        //用查询到的数据列表渲染首页
        res.render('categorylist',{
            title:'imooc 分类列表页',
            categories:categories
        });
    });
};

//list delete movie
/*exports.del=function(req,res){
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
};*/
