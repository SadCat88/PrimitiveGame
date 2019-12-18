const gulp = require("gulp");
const jsdoc = require('gulp-jsdoc3');

gulp.task("getdoc", function(cb) {
  gulp.src(["README.md", "./src/**/*.js"], { read: false })
  .pipe(jsdoc(cb));
});
