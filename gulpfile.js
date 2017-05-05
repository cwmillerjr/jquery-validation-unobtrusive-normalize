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

var steps = {
    'version-js-step': function () {
        return gulp.src([pth + 'src/jquery.validate.unobtrusive.normalize.js'])
            .pipe(replace(/@version.*/, '@version v' + pkg.version))
            .pipe(gulp.dest(pth + 'dist'))
    },
    'minifyJS-step': function () {
        return gulp.src([pth + 'dist/jquery.validate.unobtrusive.normalize.js'])
            .pipe(uglify({
                preserveComments: 'license'
            }))
            .pipe(lec({ eolc: 'CRLF' }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(pth + 'dist'))
    },
    'docs-step': function () {
        return gulp.src(pth + 'dist/jquery.validate.unobtrusive.normalize.js')
            .pipe(gulpJsdoc2md({ template: fs.readFileSync(pth + 'README.hbs', 'utf8') }))
            .on('error', function (err) {
                gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
            })
            .pipe(lec({ eolc: 'CRLF' }))
            .pipe(rename({ basename: 'README', extname: '.md' }))
            .pipe(gulp.dest(pth))
    },
    'index.d.ts-step': function () {
        return gulp.src([pth + 'src/index.d.ts'])
            .pipe(replace(/@version.*/, '@version v' + pkg.version))
            .pipe(gulp.dest(pth + 'dist'))
    }
}

gulp.task('docs', function () {
    steps['version-js-step']();
    steps['docs-step']();
});

gulp.task('minifyJS', function () {
    steps['version-js-step']();
    steps['minifyJS-step']();
});

gulp.task('default', function () {
    steps['version-js-step']();
    steps['docs-step']();
    steps['minifyJS-step']();
    steps['index.d.ts-step']();
});

gulp.task('index.d.ts', function () {
    steps['index.d.ts-step']();
});