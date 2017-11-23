# movie-web

nodejs+mongodb建站

# 用到的技术栈

Node.js+Express+MongoDB+pug

第一期主要实现电影的增删改查

第二期实现用户注册登录，评论，电影分类，电影搜索，列表分页，图片上传，同步豆瓣数据，访客统计

mongodb数据库位置  F:data/db

# 使用
git clone

npm install

cmd进入数据库文件夹，mongod命令启动服务

node app.js

# 项目页面

首页：localhost:3000/

详情页：localhost:3000/movie/:id

当前电影分页类别页：localhost:3000/movie/category/result?cat=id&p=1

用户关联：

用户注册：localhost:3000/signUp

用户登录：localhost:3000/signIn

后台管理：

当前电影列表：localhost:3000/admin/movie/list

电影录入：localhost:3000/admin/movie/new

电影数据修改：localhost:3000/admin/movie/update/:id

电影分类新增：localhost:3000/admin/category/new

用户列表：localhost:3000/admin/user/list


# 项目总结

整个项目基于NodeJs+MongoDB+jQuery+Bootstrap搭建而成，UI部分基于bootstrap，整体UI细节有待优化完善；部分功能有细微瑕疵，譬如数据的添加暂未考虑部分字段为空的情况、用户登录注册未做表单校验等等，这些都需要完善！

整个项目涉及到的知识点非常的全面，有很好的参考价值!
