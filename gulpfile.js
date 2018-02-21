// npm install gulp
// npm install gulp-concat gulp-jade gulp-sass gulp-plumber gulp-cssnano gulp-uglify gulp-autoprefixer gulp-rename gulp-watch browser-sync

var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    jade            = require('gulp-jade'),
    sass            = require('gulp-sass'),
    plumber         = require('gulp-plumber'),
    minifyCSS       = require('gulp-cssnano'),
    uglifyJS        = require('gulp-uglify'),
    autoprefixer    = require('gulp-autoprefixer'),
    rename          = require('gulp-rename'),
    watch           = require('gulp-watch'),
    browserSync     = require('browser-sync');

// compila jade
gulp.task('templates', function () {
  return gulp.src('client/**/*.jade')
    .pipe(jade({
        client: false,
        pretty: true
    }))
    .pipe(gulp.dest('./build/'))
})

// minifica e concatena folha de estilos
gulp.task('styles', function(){
    return gulp.src([
        './client/sass/style.scss',
    ])
    .pipe(plumber())
    .pipe(sass())
    .pipe(minifyCSS({
        keepBreaks: false
    }))
    .pipe(concat('build.css'))
    .pipe(gulp.dest('build/'));
});

// minifica e concatena javascript
gulp.task('js', function(){
 return gulp.src(['./client/js/**/*.js'])
    .pipe(plumber())
    .pipe(uglifyJS({mangle: false}))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('build/'))
});

// browser releaod
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './build/'
        }
    });
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('./client/**/*.jade', ['templates', browserSync.reload]);
    gulp.watch('./client/sass/**/*.scss', ['styles', browserSync.reload]);
    gulp.watch('./client/js/**/*.js', ['js', browserSync.reload]);
});
