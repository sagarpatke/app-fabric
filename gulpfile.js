const gulp = require('gulp');
const gutil = require('gulp-util');
const usemin = require('gulp-usemin');
const minifyHtml = require('gulp-minify-html');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const minifyCss = require('gulp-minify-css');
const clean = require('gulp-clean');
const flatten = require('gulp-flatten');
const eslint = require('gulp-eslint');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const gulpWebpack = require('gulp-webpack');
gulp.task('webpack', ['clean'], function() {
  const config = require('./webpack.config.js');
  return gulp.src('./client/app.jsx')
    .pipe(gulpWebpack(config))
    .pipe(gulp.dest('client/assets'));
});

gulp.task('usemin', ['clean', 'webpack'], function() {
  return gulp.src(['client/*.html', 'client/*.js'])
    .pipe(usemin({
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()],
      inlinejs: [uglify()],
      css: [rev()],
      inlinecss: [minifyCss()]
    })).pipe(gulp.dest('dist/public/'));
});

gulp.task('copy:fonts', ['clean'], function() {
  return gulp.src('client/**/*.{eot, svg, ttf, woff, woff2}')
    .pipe(flatten())
    .pipe(gulp.dest('dist/public/fonts'));
});

gulp.task('copy:package.json', ['clean'], function() {
  return gulp.src('package.json')
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('build', ['eslint', 'usemin', 'copy:fonts', 'copy:package.json']);

gulp.task('eslint', function() {
  return gulp.src([
    'gulpfile.js', 'webpack.config.js', '.eslintrc.js',
    'client/**/*.jsx', '!client/bower_components/**/*'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('webpack-dev-server', function() {
  const webpackConfig = require('./webpack.config');
  webpackConfig.devtool = 'eval';
  webpackConfig.debug = true;
  webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server');
  webpackConfig.plugins = [new webpack.HotModuleReplacementPlugin()];

  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'client/',
    hot: true,
    stats: {
      color: true
    }
  }).listen('8080', 'localhost', function(err) {
    if(err) { throw new gutil.PluginError('webpack-dev-server', err); }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/');
  });
});

gulp.task('default', ['build']);
