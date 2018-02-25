const   gulp            = require('gulp'),
        concat          = require('gulp-concat'),
        pug             = require('gulp-pug'),
        sass            = require('gulp-sass'),
        plumber         = require('gulp-plumber'),
        minifyCSS       = require('gulp-cssnano'),
        uglifyJS        = require('gulp-uglify'),
        autoprefixer    = require('gulp-autoprefixer'),
        rename          = require('gulp-rename'),
        jsImport        = require('gulp-js-import'),
        imageMin        = require('gulp-imagemin'),
        watch           = require('gulp-watch'),
        browserSync     = require('browser-sync');

// compila pug
gulp.task('templates', () =>
    gulp.src('./client/**/*.pug')
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./build/'))
);

// minifica e concatena folha de estilos
gulp.task('styles', () =>
    gulp.src(['./client/sass/style.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCSS({ keepBreaks: false }))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('./build/'))
);

// minifica e concatena javascript
gulp.task('scripts', () =>
    gulp.src(['./client/js/**/*.js'])
        .pipe(plumber())
        .pipe(jsImport({ hideConsole: true }))
        .pipe(uglifyJS({ mangle: false }))
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./build/'))
);

gulp.task('images', () =>
    gulp.src('./src/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./build/images/'))
);

// browser releaod
gulp.task('browser-sync', () =>
    browserSync({
        server: {
            baseDir: './build/'
        }
    })
);

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('./client/**/*.pug', ['templates', browserSync.reload])
    gulp.watch('./client/styles/**/*.scss', ['styles', browserSync.reload])
    gulp.watch('./client/scripts/**/*.js', ['scripts', browserSync.reload])
    gulp.watch('./client/images/*', ['images', browserSync.reload])
});

