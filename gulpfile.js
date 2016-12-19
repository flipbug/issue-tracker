var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefix = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    riot = require('gulp-riot');

var config = {
  sassPath: 'resources/scss',
  jsPath: 'resources/js',
  npmDir: 'node_modules',
  componentsDir: 'resources/components'
};

// compile sass
gulp.task('sass', function() {
  return gulp.src(config.sassPath + '/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        config.sassPath,
        config.npmDir + '/bootstrap/scss',
        config.npmDir + '/fontawesome/scss',
      ]
    }))
    .on('error', notify.onError(function(error){
      return 'Error: ' + error.message;
    }))
    .pipe(autoprefix('last 2 version'))
    .pipe(gulp.dest('./public/css'));
});

// compile js
gulp.task('js', function() {
  return gulp.src([config.npmDir + "/riot/riot.js",
                  config.npmDir + '/superagent/superagent.js',
                  config.jsPath + '/**/*.js'])
    .pipe(concat('scripts.js'))
    // TODO minify
    .on('error', notify.onError(function(error){
      return 'Error: ' + error.message;
    }))
    .pipe(gulp.dest('./public/js'));
});

// compile riot
gulp.task('riot', function() {
  return gulp.src(config.componentsDir + '/*.tag.html')
      .pipe(riot({
        compact: true // <- this
      }))
      .pipe(gulp.dest('./public/components'));
});

// watch for changed sass files
gulp.task('sass:watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

// watch for changed js files
gulp.task('js:watch', function() {
    gulp.watch([config.jsPath + '/**/*.js', config.modelsPath + '/*.js',], ['js']);
});

// watch for changed riot files
gulp.task('riot:watch', function() {
    gulp.watch(config.componentsDir + '/**/*.tag.html', ['riot']);
});

// default task
gulp.task('default', ['sass', 'sass:watch', 'riot', 'riot:watch', 'js', 'js:watch']);

// default task
gulp.task('build', ['sass', 'riot', 'js']);