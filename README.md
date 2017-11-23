# movie-web

nodejs+mongodb建站

# 用到的技术栈

Node.js+Express+MongoDB+pug

第一期主要实现电影的增删改查

mongodb数据库位置  F:data/db

# 使用
git clone

npm install

cmd进入数据库文件夹，mongod命令启动服务

node app.js

# 网站整体功能

网站正常访问无需管理员权限，对电影的评论及个人中心资料的修改，需要用户登录，对网站数据的修改添加删除需要管理员的权限，默认一个管理员，具体功能如下：

实现了用户的基本注册，登录，登出及管理功能；
实现了搜索功能，模糊关键字可搜索电影名字及电影类别下的电影；
用户登录做session处理；
用户可以对电影进行评论；
电影添加分类及录入，数据可以同步豆瓣ID；
对电影数据作分页处理，分页查询数据库数据；
管理员可以对网站数据进行增加删除修改（需要管理员权限）；
管理员可从后台查看所有的电影、用户、评论、访问量等数据；



# 项目页面

当使用管理员账号（chenjun,123456）登录时，在网站右上角会出现下拉菜单，通过点击菜单可以进入各个页面，如果自己注册的账号，默认为普通用户（role为0），普通用户有权限限制，是无法进入到电影的列表、录入、分类、用户等管理页面的！当然，可自行修改数据库里的当前账号的role值，当role大于10的时候，就有管理员权限了！基本的界面路由如下： 基本页面：

首页：localhost:3000/
详情页：localhost:3000/movie/:id
当前电影分页类别页：localhost:3000/movie/category/result?cat=id&pageSize=1
用户关联：

用户注册：localhost:3000/signUp
用户登录：localhost:3000/signIn
用户个人中心：localhost:3000/user/center?userId=id
后台管理：

当前电影列表：localhost:3000/admin/movie/list
电影录入：localhost:3000/admin/movie/add
电影数据修改：localhost:3000/admin/movie/update/:id
电影分类列表：localhost:3000/admin/category/list
电影分类修改：localhost:3000/admin/category/update/:id
电影分类新增：localhost:3000/admin/category/new
用户列表：localhost:3000/admin/user/list


# 项目总结

整个项目基于NodeJs+MongoDB+jQuery+Bootstrap搭建而成，UI部分基于bootstrap，整体UI细节有待优化完善；部分功能有细微瑕疵，譬如数据的添加暂未考虑部分字段为空的情况、用户登录注册未做表单校验等等，这些都需要完善！整个项目涉及到的知识点非常的全面，有很好的参考价值!
