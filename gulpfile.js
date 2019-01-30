'use strict';

var gulp        = require('gulp'),
    gp          = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();


gulp.task('pug', function() {
  return gulp.src('src/pug/pages/*.pug')
        .pipe(gp.pug({
          pretty: true
        }))
        .pipe(gulp.dest('build'))
        .on('end', browserSync.reload);
});

gulp.task('scss', function() {
  return gulp.src('src/static/scss/style.scss')
      .pipe(gp.sourcemaps.init())
      .pipe(gp.sass())
      .pipe(gp.autoprefixer({
        browsers: ['last 2 versions']
      }))
      .on('error', gp.notify.onError({
        message: 'Error: <%= erorr.message %>',
        title: 'Error running something'
      }))
      .pipe(gp.csso())
      .pipe(gp.sourcemaps.write())
      .pipe(gulp.dest('build/css'))
      .pipe(browserSync.reload({ stream: true }));
});

gulp.task('serve', function(done) {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
  done();
});

gulp.task('watch', function() {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/static/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('default', gulp.series(
  gulp.parallel('pug', 'scss'),
  gulp.parallel('watch', 'serve')
));
