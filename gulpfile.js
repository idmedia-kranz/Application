var conf = {
	compass: {
		sass: 'src/scss',
		css: 'app/public/css',
		comments: true
    },
	sources: {
		typings: 'typings/browser.d.ts',
		ts: 'src/ts/**/*.ts',
		ts_html: 'src/ts/**/*.html',
		ts_css: 'src/ts/**/*.css',
		ts_scss: 'src/ts/**/*.scss',
		js_main: 'src/js/[!_]*.js',
		js: 'src/js/**/*.js',
		scss: 'src/scss/**/*.scss',
		html: 'src/html/**/*.html',
		node: 'src/node/**/*.ts'
	},
	output: {
		js: 'app/public/js',
		css: 'app/public/css',
		root: 'app',
		temp: 'temp'
	}
}

var gulp = require('gulp');
var watch = require('gulp-watch');
var include = require("gulp-include");
var compass = require('gulp-compass');
var nodemon = require("gulp-nodemon");
var clean = require("gulp-clean");
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json',{
    typescript: require('typescript'),
    outFile: 'app.js'
});
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var tap = require("gulp-tap");
var path = require("path");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var embedTemplates = require('gulp-angular-embed-templates');
var embedStyles = require('./node_modules_own/gulp-angular-embed-styles');

 gulp.task('compile_scss', function() {
  return gulp.src(conf.sources.scss)
    .pipe(compass(conf.compass));
});

gulp.task('compile_ts_scss', function() {
  return gulp.src(conf.output.temp)
    .pipe(compass({ sass: conf.output.temp, css: conf.output.temp }));
});

gulp.task('compile_node', function() {
	var tsResult = gulp.src([conf.sources.typings, conf.sources.node])
				   .pipe(ts(tsProject))
	return tsResult.js
				.pipe(gulp.dest('.'));
});

gulp.task('compile_ts', function() {
	var tsResult = gulp.src([conf.sources.typings, conf.sources.ts])
				   .pipe(ts(tsProject))
	return tsResult.js
				//.pipe(sourcemaps.init())
				//.pipe(uglify())
				//.pipe(sourcemaps.write())
				.pipe(gulp.dest(conf.output.temp));
});

gulp.task('transfer_ts_assets', function() {
	return gulp.src([conf.sources.ts_html, conf.sources.ts_css, conf.sources.ts_scss])
	.pipe(gulp.dest(conf.output.temp));
});

gulp.task('embed_ts_assets', function () {
    gulp.src(conf.output.temp+'/**/*.js')
        .pipe(embedTemplates())
		.pipe(embedStyles())
        .pipe(gulp.dest(conf.output.js));
});

gulp.task('transfer_html', function() {
	return gulp.src(conf.sources.html)
	.pipe(gulp.dest(conf.output.root));
});

gulp.task('compile_js', function() {
	return gulp.src(conf.sources.js_main)
		.pipe(tap(function (file) {
			return gulp.src(file.path)
				.pipe(include())
				//.pipe(sourcemaps.init())
				//.pipe(uglify())
				//.pipe(sourcemaps.write())
				.pipe(gulp.dest(conf.output.js));
	}));
});

gulp.task('clean', function() {
	return gulp.src(conf.output.temp, {read: false})
			.pipe(clean());

});			

gulp.task('nodemon', function() {
	nodemon({ 
		script: 'app.js',
		ignore: ["app/*", "src", 'gulpfile.js', 'temp', 'node_modules'],
		stdout: true
	}).on('restart', function () {
		console.log("Restart Node");
		setTimeout(livereload.reload, 1000);
	});
});			
	
gulp.task('livereload', function() {
    return livereload.reload();
});

gulp.task('start',[], function () {
	
	livereload.listen();
	
	watch([conf.sources.ts, conf.sources.ts_html, conf.sources.ts_css, , conf.sources.ts_scss], function(vinyl){
		console.log("ts File Changed: ", vinyl.path);
		runSequence('clean', 'transfer_ts_assets', 'compile_ts_scss', 'compile_ts',  'embed_ts_assets', 'livereload');
	});
	
	watch(conf.sources.scss, function(vinyl){
		console.log("scss File Changed: ", vinyl.path);
		runSequence('clean', 'compile_scss', 'livereload');
	});
	
	watch(conf.sources.html, function(vinyl){
		console.log("html File Changed: ", vinyl.path);
		runSequence('clean', 'transfer_html', 'livereload');
	});
	
	watch(conf.sources.js, function(vinyl){
		console.log("js File Changed: ", vinyl.path);
		runSequence('clean', 'compile_js', 'livereload');
	});
	
	watch(conf.sources.node, function(vinyl){
		console.log("node Changed: ", vinyl.path);
		runSequence('clean', 'compile_node');
	});
	
	
runSequence('clean', ['transfer_ts_assets', 'transfer_html'], ['compile_js', 'compile_ts', 'compile_scss', 'compile_ts_scss'], ['compile_node', 'embed_ts_assets'],  'nodemon');
	 
});