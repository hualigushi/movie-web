//电影控制器
var Comment=require('../models/comment');//引入movie模型文件

//从表单提交的数据的存储处理
exports.save=function(req,res){
    var _comment = req.body.comment;
    var movieId = _comment.movie;

    //判断是否是回复
    if(_comment.cid){
        Comment.findById(_comment.cid,function(err,comment){
            var reply={
                from:_comment.from,
                to:_comment.tid,
                content:_comment.content
            };
            comment.reply.push(reply);
            comment.save(function(err,comment){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+movieId);
            });
        })
    }else {
        var comment = new Comment(_comment);

        comment.save(function(err,comment){
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+movieId);
        });
    }
};

