/// <binding BeforeBuild='default' />
var pth = './';
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    lec = require('gulp-line-ending-corrector'),
    pkg = require(pth + 'package.json'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    gulpJsdoc2md = require('gulp-jsdoc-to-markdown'),
    concat = require('gulp-concat');

gulp.task('minifyJS', function () {
    gulp.src([pth + 'src/jquery.validate.unobtrusive.normalize.js'])
        .pipe(replace(/@version.*/, '@version v' + pkg.version))
        .pipe(gulp.dest(pth + 'dist'))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(lec({ eolc: 'CRLF' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(pth + 'dist'));
});
gulp.task('docs', function () {
    return gulp.src(pth + 'src/jquery.validate.unobtrusive.normalize.js')
        .pipe(gulpJsdoc2md({ template: fs.readFileSync(pth + 'README.hbs', 'utf8') }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
        })
        .pipe(lec({ eolc: 'CRLF' }))
        .pipe(rename({ basename: 'README', extname: '.md' }))
        .pipe(gulp.dest(pth))
});

gulp.task('default', ['docs', 'minifyJS']);