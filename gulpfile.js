var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

// 画像圧縮系(lossless)
//var imagemin = require('gulp-imagemin');
var imagemin = require('imagemin');
var jpegtran = require('imagemin-jpegtran');
var optipng = require('imagemin-optipng');

// ファイル監視
gulp.task('w', function(){
	gulp.watch('./**/*.html',['reload']);
	gulp.watch('js/**/*.js',['reload']);
	var watcher = gulp.watch('sass/**/*.scss',['sass']);
	watcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

// ローカルサーバ起動
gulp.task('server',function(){
	browserSync({
		port: 8282,
		server: {
			baseDir :	'./',
			index	:	'index.html'
		}
	});
});

// ブラウザリロード
gulp.task('reload', function () {
	browserSync.reload();
});

// sassコンパイル
gulp.task('sass', function () {
	return sass('sass/**/*.scss',{
		style : 'expanded'
	})
	.pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
	.pipe(gulp.dest('css/'))
	.pipe(browserSync.stream())
	.pipe(notify({
		title: 'Sassをコンパイルしました。',
		message: new Date(),
	}));
});

// 画像圧縮処理
gulp.task('imagemin', function() {
	imagemin(['img/**/*.jpg'], 'img/', {use: [jpegtran({progressive: true})]}).then(function (){
		console.log('Images optimized');
	});
	imagemin(['img/**/*.png'], 'img/', {use: [optipng()]}).then(function(){
		console.log('Images optimized');
	});
});

//// 画像圧縮処理
//gulp.task('imagemin', function() {
//	gulp.src('./img/**/*')
//		.pipe(imagemin())
//		.pipe(gulp.dest('./img/'));
//});

// 実行
gulp.task('default',["server"], function(){
	gulp.run('w');
	gulp.run('server');
});
