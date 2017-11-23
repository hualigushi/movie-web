//首页控制器
var Movie=require('../models/movie');//引入movie模型文件
var Category = require('../models/category');

//index page
exports.index = function(req,res){
    Category
        .find({})
        .populate({path:'movies',options:{limit:5}})
        .exec(function(err,categories){
            if(err){
                console.log(err);//打印错误
            }
            //用查询到的数据列表渲染首页
            res.render('index',{
                title:'imooc 首页',
                categories:categories
            });
        });
}

//分页搜索
exports.search = function(req,res){
    var catId = req.query.cat;
    var q = req.query.q;
    var page=parseInt(req.query.p,10) || 0;
    var count = 2;
    var index = page*count;//开始查找的位置

    if(catId){ //分类搜索
        var _category = Category.findOne({_id:catId});
        _category.exec().then(function(category){
            var totalPage = category.movies.length;
            _category
                .populate({
                    path:'movies',
                    options:{limit:count,skip:index}
                })
                .exec(function(err,categories){
                    if(err){
                        console.log(err);//打印错误
                    }
                    var results = categories.movies || [];

                    //用查询到的数据列表渲染首页
                    res.render('results',{
                        title:'imooc 结果列表页面',
                        keyword:categories.name,
                        currentPage:(page+1),//当前页
                        query:'cat='+catId,
                        totalPage:Math.ceil(totalPage/count),//全部页数
                        movies:results
                    });
                });
        })
    }else{ //搜索框搜索
        Movie
            .find({title:new RegExp('.*'+q+'.*')}, null, {limit: count, skip: index})
            .exec(function(err,movies){
                if(err){
                    console.log(err);//打印错误
                }
                var results = movies || [];

                //用查询到的数据列表渲染首页
                res.render('results',{
                    title:'imooc 结果列表页面',
                    keyword:q,
                    currentPage:(page+1),//当前页
                    query:'q='+q,
                    totalPage:Math.ceil(movies.length/count),//全部页数
                    movies:results
                });
            });

    }
}
