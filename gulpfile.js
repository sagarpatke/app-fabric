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
const htmlhint = require('gulp-htmlhint');

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
  return gulp.src(['client/*.html'])
    .pipe(usemin({
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()],
      inlinejs: [uglify()],
      css: [rev()],
      inlinecss: [minifyCss()]
    })).pipe(gulp.dest('dist/server/public'));
});

gulp.task('copy:fonts', ['clean'], function() {
  return gulp.src('client/**/*.{ttf,woff,eof,svg}')
    .pipe(flatten())
    .pipe(gulp.dest('dist/server/public/fonts'));
});

gulp.task('copy:package.json', ['clean'], function() {
  return gulp.src('package.json')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:server', ['clean'], function() {
  gulp.src(['server/**/*'])
    .pipe(gulp.dest('dist/server/'));
});

gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('copy', ['copy:package.json', 'copy:server', 'copy:fonts']);

gulp.task('build', ['eslint', 'usemin', 'copy']);

gulp.task('eslint', function() {
  return gulp.src([
    'gulpfile.js', 'webpack.config.js', '.eslintrc.js',
    'client/**/*.jsx', '!client/bower_components/**/*', 'server/**/*'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('htmlhint', function() {
  return gulp.src(['client/**/*.html','!client/bower_components/**/*'])
  .pipe(htmlhint({htmlhintrc: ".htmlhintrc"}))
  .pipe(htmlhint.failReporter());
});

gulp.task('webpack-dev-server', ['eslint'], function() {
  const webpackConfig = require('./webpack.config');
  webpackConfig.devtool = 'eval-source-map';
  webpackConfig.debug = true;
  webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server');
  webpackConfig.plugins = [new webpack.HotModuleReplacementPlugin()];

  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'client/',
    hot: true,
    setup: function(app) {
      require('./server/app')(app, {static: false});
    },
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }).listen('8080', 'localhost', function(err) {
    if(err) { throw new gutil.PluginError('webpack-dev-server', err); }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/');
  });
});

gulp.task('default', ['build']);
