//Require the dev-dependencies
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var exec = require('child_process').exec;

gulp.task('test', function() {
   return gulp.src('tests/*.js')
      .pipe(jasmine({verbose:true}));
});


/* 

gulp.task('helloTest', function (callback) {
    exec('node testing.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callback(err);
    });
});


gulp.task('watch', function (callback) {
      gulp
      .watch(['D:\\OfficeWork\\TAIS\\watch_testing\\*.js'])
      .on('change', function(file) {
            console.log("File "+file.path+" changed.");
      });
  }); */