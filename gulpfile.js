var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    watch       = require('gulp-watch'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    nodemon     = require('gulp-nodemon'),
    less        = require('gulp-less'),
    imagemin    = require('gulp-imagemin')
   
/**
 * Gulp Tasks
 */
 
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:5000",  // local node app address
    port: 5001,  // use *different* port than above
    notify: true
  });
});
 
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});
//for javscript files
gulp.task('js', function () {
   return gulp.src('public/javascripts/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('public/build'));
});
// //for css files
// gulp.task('less',function(){
//    return gulp.src('public/style/*.less')
//         .pipe(less())
//         .pipe(gulp.dest('public/style'))
//         .pipe(reload({stream:true}));
// });

//minify images 

gulp.task('imagemin',function(){
   return gulp.src('public/images/*')
      .pipe(imagemin({
         progressive: true
      }))
      .pipe(gulp.dest('public/build/images'))

})

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['public/javascripts/*.js'], ['js',reload]);
  gulp.watch(['public/images/**.*'], ['imagemin',reload]);
});