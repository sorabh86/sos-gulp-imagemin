// Gulp.js Configuration

// inclue gulp and plugins
var gulp = require('gulp'),
    // only pipe throw those file not found in folder
    newer = require('gulp-newer'),
    // compress image files
    imagemin = require('gulp-imagemin'),
    // clean directory
    del = require('del'),
    pkg = require('./package.json');

// file location
var devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() != 'production'),
    source = 'source/',
    dest = 'dest/',
    images = {
        in: source+'images/*.*',
        out: dest+'images/'
    };

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// clean
gulp.task('clean', function(){
    del([dest+'*']);
});

// manage images
gulp.task('images', function () {
    return gulp.src(images.in)
        .pipe(newer(images.out))
        .pipe(imagemin())
        .pipe(gulp.dest(images.out));
});

// default task , those task run simultaniously, so defining ['clean', 'images'] will not work
gulp.task('default', ['images'], function(){

});