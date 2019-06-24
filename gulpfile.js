// requirements
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify');

// define paths
var paths = {
    src   : 'scss/**/*.scss',
    dest  : 'css' 
}

 // Error message
 var onError = function (err) {
  notify.onError({
      title   : 'Gulp',
      subtitle: 'Failure!',
      message : 'Error: <%= error.message %>',
      sound   : 'Beep'
  })(err);

  this.emit('end');
};

gulp.task('styles', function () {
  var stream = gulp
      .src([paths.src])
      .pipe(plumber({errorHandler: onError}))
      .pipe(sass().on('error', sass.logError));

  return stream
      .pipe(gulp.dest(paths.dest));
});

gulp.task('default', (done) => {
  gulp.watch(paths.src, gulp.parallel('styles'));
});