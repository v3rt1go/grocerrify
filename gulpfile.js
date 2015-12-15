'use strict';
const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
//const gulpFilter = require('gulp-filter');
//const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const _ = require('lodash');

// TODO: Extend gulpfile with info from https://jonsuh.com/blog/integrating-react-with-gulp/
//const onError = function(err) {
  //notify.onError({
    //title:    "Error",
    //message:  "<%= error %>"
  //})(err);
  //console.error(err);
  //this.emit('end');
//};

//var plumberOptions = {
  //errorHandler: onError
//};

const paths = {
  vendor: [
    'node_modules/react/dist/react-with-addons.js', 
    'node_modules/react-dom/dist/react-dom.js',
    'node_modules/jquery/dist/jquery.min.js'
  ],
  scripts: ['gulpfile.js', 'index.js', 'server/**/*.js', 'app/**/*.js'],
  serverViews: ['./app/views/**/*.hbs'],
  clientScripts: ['app/**/*.js'],
  clientViews: ['./app/**/*.html'],
  clientStyles: ['./app/**/*.css']
};

// Linting tasks
gulp.task('lint-watch', () => {
  // Lint only files that change after this watch starts
  let lintAndPrint = eslint();
  // format results with each file, since this stream won't end.
  lintAndPrint.pipe(eslint.formatEach());

  return gulp.watch(paths.scripts, (event) => {
    if (event.type !== 'deleted') {
      gulp.src(event.path)
        .pipe(lintAndPrint, { end: false });
    }
  });
});

gulp.task('cached-lint', () => {
  // Read all js files within test/fixtures
  return gulp.src(paths.scripts)
    .pipe(cache('eslint'))
    // Only uncached and changed files past this point
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result((result) => {
      if (result.warningCount > 0 || result.errorCount > 0) {
        // If a file has errors/warnings remove uncache it
        delete cache.caches.eslint[path.resolve(result.filePath)];
      }
    }));
});

// Run the "cached-lint" task initially...
gulp.task('cached-lint-watch', ['cached-lint'], () => {
  // ...and whenever a watched file changes
  return gulp.watch(paths.scripts, ['cached-lint'], (event) => {
    if (event.type === 'deleted' && cache.caches.eslint) {
      // remove deleted files from cache
      delete cache.caches.eslint[event.path];
    }
  });
});

// Watch task
gulp.task('watch', ['cached-lint-watch']);

// Babel task to build the .js for production
// TODO: add minification
gulp.task('build-server', () => {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/server'));
});

gulp.task('build-client', () => {
  return gulp.src(paths.clientScripts)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['react', 'es2015', 'stage-2']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('copy-vendor', () => {
  gulp.src(paths.vendor)
    .pipe(concat('dist/vendor/vendor.js'))
    .pipe(newer('dist/vendor/vendor.js'))
    .pipe(gulp.dest('./'));
});

// Nodemon task
// TODO: There is a browserSync delay when the browser is opened and until the page
// is served when starting the server and sometimes during a reload. I cannot figure out
// why this is happening.
gulp.task('nodemon', (cb) => {
  let called = false;
  return nodemon({
    script: 'index.js',
    watch: ['index.js', 'server/', 'app/views/'],
    ext: "js hbs",
    exec: "npm run babel-node",
    env: {
      "NODE_ENV": "development"
    }
  })
  // The start and restart event handlers are needed to make browserSync work with nodemon
  .on('start', () => {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', () => {
    setTimeout(() => {
      reload({ stream: false });
    }, 1000);
  });
});

// Browser sync task
gulp.task('browser-sync', ['nodemon'], () => {
  browserSync({
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: ['google-chrome'],
    reloadDelay: 1000
  });
  notify('Server started!');
});

gulp.task('start:dev', ['browser-sync'], () => {
  // TODO: Gulp does not ignore the files and folder I tell it to, so it restarts on every
  // change even inside app/lib
  gulp.watch(_(paths.clientScripts).concat(paths.clientViews, paths.clientStyles).value())
    .on('change', browserSync.reload);
});

