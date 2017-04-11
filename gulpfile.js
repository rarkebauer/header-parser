var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');

gulp.task('test', function() {
  var error = false;
  gulp.
    src('./test.js').
    pipe(mocha({ reporter: 'spec' })).
    on('error', function() {
      console.log('Tests failed!');
      error = true;
    }).
    on('end', function() {
      if (!error) {
        process.exit(0);
      }
    });
});

gulp.task('watch', function() {
	gulp.watch('./test.js', ['test']);
	gulp.watch('./index.js', ['test'])
	gulp.watch('./*.html', ['html']);
});

gulp.task('start', function() {
	nodemon({
		script: 'index.js'
		, ext: 'js html'
		, env: {'NODE_ENV': 'development'}
	});
});

gulp.task('connect', function() {
	connect.server({
		root: '.',
		livereload: true
	})
});

gulp.task('html', function() {
	gulp.src('./*.html')
	.pipe(connect.reload())
});

gulp.task('default', ['html', 'test', 'connect', 'watch', 'start'])




