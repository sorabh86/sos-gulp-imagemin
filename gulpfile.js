// Gulp.js Configuration

// inclue gulp and plugins
var gulp = require('gulp'),
    // only pipe throw those file not found in folder
    newer = require('gulp-newer'),
    // minified html
    htmlclean = require('gulp-htmlclean'),
    // for combining different section of html template to built one master file
    preprocess = require('gulp-preprocess'),
    // compress image files
    imagemin = require('gulp-imagemin'),
    // clean directory
    del = require('del'),
    pkg = require('./package.json');

// file location
var devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() != 'production'),
    source = 'source/',
    dest = 'dest/',
    html = {
        in : source + '*.html',
        watch : [source + '*.html', source + 'templates/**/*'],
        out : dest,
        context : {
            devBuild : devBuild,
            author : pkg.author,
            version : pkg.version
        }
    },
    images = {
        in: source+'images/*.*',
        out: dest+'images/'
    };

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// clean built
gulp.task('clean', function(){
    del([dest+'*']);
});

// built HTML files
gulp.task('html', function() {
    var page =  gulp.src(html.in).pipe(preprocess({ context:html.context }));
    if(!devBuild) {
        page = page.pipe(htmlclean());
    }
    return page.pipe(gulp.dest(html.out));
});

// manage images
gulp.task('images', function () {
    return gulp.src(images.in)
        .pipe(newer(images.out))
        .pipe(imagemin())
        .pipe(gulp.dest(images.out));
});

// default task , those task run simultaniously, so defining ['clean', 'images'] will not work
gulp.task('default', ['html', 'images'], function(){

    // html changes
    gulp.watch(html.watch, ['html']);

    // compress image
    gulp.watch(images.in, ['images']);
});