// Gulp.js Configuration

// inclue gulp and plugins
var gulp = require('gulp'),
    // only pipe throw those file not found in folder
    newer = require('gulp-newer'),
    // compress image files
    imagemin = require('gulp-imagemin');

// file location
var source = 'source/',
    dest = 'dest/',
    images = {
        in: source+'images/*.*',
        out: dest+'images/'
    };

// manage images
gulp.task('images', function () {
    return gulp.src(images.in)
        .pipe(newer(images.out))
        .pipe(imagemin())
        .pipe(gulp.dest(images.out));
});

// default task
gulp.task('default', function(){

});