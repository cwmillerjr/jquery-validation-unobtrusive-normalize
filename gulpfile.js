var pth = "./";
var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    lec = require('gulp-line-ending-corrector'),
    pkg = require(pth + 'package.json');

gulp.task("minifyJS", function () {
    gulp.src([pth + "src/jquery.validate.unobtrusive.normalize.js"])
        .pipe(replace(/@version.*/, '@version v' + pkg.version))
        .pipe(gulp.dest(pth + "dist"))
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(lec({ eolc: 'CRLF' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(pth + "dist"));
});

gulp.task("default", ["minifyJS"]); 