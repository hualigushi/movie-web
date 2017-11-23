// 引入 gulp
var gulp = require('gulp');

// 引入组件
var uglify = require('gulp-uglify');

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('app/*/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function(){
    gulp.watch('app/*/*.js', function(){
        gulp.run('scripts');
    });
});

