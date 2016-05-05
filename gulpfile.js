var conf = {
	compass: {
		sass: 'src/scss',
		css: 'app/public/css',
		comments: true
    },
	sources: {
		typings: 'typings/browser.d.ts',
		ts: 'src/ts/**/*.ts',
		ts_assets: 'src/ts/**/*.{css,html}',
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
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var embedTemplates = require('gulp-angular-embed-templates');
var embedStyles = require('gulp-angular-embed-styles');

 gulp.task('compile_scss', function() {
  return gulp.src(conf.sources.scss)
    .pipe(compass(conf.compass));
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
	return gulp.src(conf.sources.ts_assets)
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

gulp.task('clean_output', function() {
	
	return gulp.src(conf.output.root+'/**/*', {read: false})
			.pipe(tap(function(file) {
				if(path.basename(file.path).startsWith('_')){
					return gulp.src(file.path, {read: false}).pipe(clean());
				}
			}));

});			

gulp.task('nodemon', function() {
	nodemon({ 
		script: 'app.js',
		ignore: ["app/**/*", "src/**/*"],
		stdout: false
	}).on('restart', function () {
		console.log("Restart Node");
	}).on('readable', function() {
		this.stdout.on('data', function(chunk) {
			if (/^listening/.test(chunk)) {
				livereload.reload();
			}
			process.stdout.write(chunk);
		})
	});
});			
	
	
gulp.task('livereload', function() {
    return livereload.reload();
});


gulp.task('start',[], function () {
	
	livereload.listen();
	
	watch([conf.sources.ts, conf.sources.ts_assets], function(vinyl){
		console.log("ts File Changed: ", vinyl.path);
		runSequence('compile_ts', 'transfer_ts_assets', 'embed_ts_assets', 'livereload');
	});
	
	watch(conf.sources.scss, function(vinyl){
		console.log("scss File Changed: ", vinyl.path);
		runSequence('compile_scss', 'livereload');
	});
	
	watch(conf.sources.html, function(vinyl){
		console.log("html File Changed: ", vinyl.path);
		runSequence('transfer_html', 'livereload');
	});
	
	watch(conf.sources.js, function(vinyl){
		console.log("js File Changed: ", vinyl.path);
		runSequence('compile_js', 'livereload');
	});
	
	watch(conf.sources.node, function(vinyl){
		console.log("node Changed: ", vinyl.path);
		runSequence('compile_node');
	});
	
	
	runSequence(['compile_js', 'compile_ts', 'transfer_ts_assets', 'compile_scss', 'transfer_html'], 'embed_ts_assets', 'compile_node', 'nodemon');
	
});