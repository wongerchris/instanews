// Gulp pluggin variables
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

//Path variables
var sassLink = "sass/**/*.scss";
var jsLink = "./js/**/*.js";

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(sassLink)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

//Compile javascript file
gulp.task('compress', function(){
  gulp.src([jsLink])
    .pipe(uglify())
    .pipe(plumber())
    .pipe(rename({extname:'.min.js'}))
    .pipe(gulp.dest('./js/min'));
});

// Static Server + watching scss/html files
gulp.task('server', ['sass'], function() {
   browserSync.init({
        server: "./"
   });
    gulp.watch(sassLink, ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

//Adds browser prefix to css
gulp.task('autoprefix', function () {
    return gulp.src('./css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css/cssprefix'));
});

//Minifies css file
gulp.task('minify-css', function() {
  return gulp.src('css/cssprefix/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({extname:'.min.css'}))
    .pipe(gulp.dest('dist'));
});

//Watch task
gulp.task('watch',function() {
  gulp.watch(sassLink,['server']);
  //gulp.watch(jsLink, ['compress']);  
});

gulp.task('default',['sass','server'])


