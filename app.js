#!/usr/bin/env nodejs

// Depdencias
var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var pg = require('pg');
global.appRoot = path.resolve(__dirname);

// Rutas
var index = require(appRoot + '/routes/index');

// Crea aplicación web con Express
var app = express();

// Dirección IP y puerto de escucha de peticiones
app.set('ip', process.env.IP || '0.0.0.0');
app.set('port', process.env.PORT || 3000);
// Directorio con las plantillas
app.set('views', path.join(__dirname, 'views'));
// Motor de visualización
app.set('view engine', 'jade');

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Logger de solicitudes HTTP
app.use(logger('dev'));
// Parseadores
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//Manejador de enrutado
app.use(express.static(path.join(__dirname, 'public')));

// Acceso
app.get('/', index.select);
app.get('/insert/:empresa/:alumno/:calificacion', index.insert);
app.get('/update/:id/:calificacion', index.update);
app.get('/delete/:id', index.delete);

// Captura errores 404 y los reenvia al manejador de errores
app.use(function(req, res, next) {
  var err = new Error('Error 404: Página no encontrada.');
  err.status = 404;
  next(err);
});

// Manejador de errores:
app.use(function(err, req, res, next) {
  res.status(err.status);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// Servidor escuchando dirección y puertos correspondientes
app.listen(app.get('port'), app.get('ip'), function() {
  console.log('Aplicación escuchando peticiones para la dirección ' + app.get('ip') +
    ' en el puerto ' + app.get('port') + " ...");
});

module.exports = app;
