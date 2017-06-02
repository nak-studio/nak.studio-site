// nakPostCSS gulpfile by @nabaroa
var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssimport = require('postcss-import'),
    customproperties = require('postcss-custom-properties'),
    apply = require('postcss-apply'),
    mixins = require('postcss-mixins'),
    nested = require('postcss-nested'),
    customMedia = require("postcss-custom-media")
    nano = require('gulp-cssnano'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

gulp.task('css', function() {
    var processors = [
      cssimport,
      autoprefixer,
      customproperties,
      apply,
      mixins,
      nested,
      customMedia
    ];
    var configNano = {
      autoprefixer: { browsers: 'last 2 versions' },
      discardComments: { removeAll: true },
      safe: true
    };
    return gulp.src('./css/*.css') 
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./docs/css'))
        .pipe(notify({ message: 'Your CSS is ready ♡' }));
});

// Default
gulp.task('default', ['css', 'watch',]);


// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('css/**/*.css', ['css']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['css/']).on('change', livereload.changed);

});
