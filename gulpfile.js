var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var easysprite = require('postcss-easysprites');
var autoprefixer = require('autoprefixer');
var watch = require('gulp-watch');

// Gulp Sass task.
gulp.task('sass', function() {
  "use strict";
  return gulp.src('./sass/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss([
      easysprite({
        imagePath:'./gfx',
        spritePath: './gfx/sprites',
        stylesheetPath: './css'
      }),
      autoprefixer({
        browsers: ['> 5%','safari 8']
      })
    ]))
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./css'));
});

// Create Gulp default task.
// Having watch within the task ensures that 'sass' has already ran before watching.
gulp.task('default', gulp.series('sass', function () {
  "use strict";
  return watch('./sass/{,**/}*.{scss,sass}', ['sass'])
}));

