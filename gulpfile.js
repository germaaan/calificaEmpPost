#!/usr/bin/env nodejs

// Dependencias
var gulp = require('gulp');

var docco = require("gulp-docco");
var env = require('gulp-env');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');

var test = ['app.js', 'routes/*.js', 'models/*.js'];
var all = ['app.js', 'routes/*.js', 'models/*.js', 'test/test.js'];

var testing = false;

// Finaliza la ejecución una vez la tarea ha sido terminada
gulp.on('stop', function() {
  if (testing) {
    process.nextTick(function() {
      process.exit(0);
    });
  }
});

// Comprobación sintáctica del código
gulp.task('lint', function() {
  return gulp.src(all)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Ejecución de test de cobertura
gulp.task('pre-test', function() {
  return gulp.src(test)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

// Ejecución de test unitarios
gulp.task('test', ['lint', 'pre-test'], function() {
  testing = true;
  return gulp.src(['test/test.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
}, ['stop']);

// Genera documentación
gulp.task('doc', function() {
  return gulp.src(all)
    .pipe(docco())
    .pipe(gulp.dest('./doc'));
});

// Tarea por defecto (métodos de generación)
gulp.task('default', ['doc']);

// Ejecuta la aplicación con nodemon en modo desarrollo
gulp.task('server', ['default'], function() {
  nodemon({
      script: 'app',
      ext: 'js',
      env: {
        'NODE_ENV': 'development',
        'PORT': 3000,
        'IP': '127.0.0.1'
      }
    })
    .on('restart', function() {
      console.log('Servidor reiniciado...')
    })
});
