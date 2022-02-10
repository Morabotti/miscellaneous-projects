const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const jsonMinify = require('gulp-json-minify');
const imagemin = require('gulp-imagemin');
const util = require('gulp-util');


gulp.task('minify-css', () => {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
        .on('error', util.log);
});

gulp.task('json:minify', function() {
    return gulp.src('src/**/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('dist'))
        .on('error', util.log);
});

gulp.task('default', () =>{
    return gulp.src('src/**/*.{png,jpg,gif,svg,ico}').pipe(imagemin()) .pipe(gulp.dest('dist')).on('error', util.log)
});