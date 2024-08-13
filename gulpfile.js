const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const liveLoader = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var notify = require("gulp-notify");
// var zip = require("gulp-zip");
// Task to concatenate JavaScript files
gulp.task('js', function() {
    return gulp.src(['./src/*.js', '!./src/not.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify("concat js files successfully"))
        .pipe(liveLoader());
});

// Task to compile Sass files
gulp.task('compileSass', function() {
    return gulp.src('./src/style.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./dist'))
        .pipe(notify("compiled scss files successfully")) 
        .pipe(liveLoader());
});

// Task to zip files
gulp.task('zip', async function() {
    const zip = await import('gulp-zip');
    return gulp.src('dist/**/*.*')
        .pipe(zip.default('blog.zip'))
        .pipe(gulp.dest('./'))
        .pipe(notify("all  files  zip successfully")) 

});

// Watch task to monitor file changes
gulp.task('watch', function() {
    require('./server.js');
    liveLoader.listen();
    gulp.watch('src/*.js', gulp.series('js'));
    gulp.watch('src/*.scss', gulp.series('compileSass'));
    // gulp.watch('dist/**/*.*', gulp.series('zip'));

});


// Default task to run the watch task
gulp.task('default', gulp.series('watch')); 
