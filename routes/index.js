// Dependencias
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

// Ejecución de las consultas
router.post('/api/v1/calificaciones', function(req, res) {
  var results = [];

  // Obtener datos de petición http
  var data = {
    empresa: req.body.empresa,
    alumno: req.body.alumno,
    calificacion: req.body.calificacion,
  };

  // Conectar con el cliente PostgreSQL
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    // Manejador de errores
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    // Consulta de inserción
    client.query("INSERT INTO calificaciones(empresa, alumno, calificacion) values($1, $2, $3)", [data.empresa, data.alumno, data.calificacion]);

    // Consulta de selección
    var query = client.query("SELECT * FROM calificaciones");

    // Devolvemos los resultados de la consulta de selección
    query.on('row', function(row) {
      results.push(row);
    });

    // Cerramos la conexión y devolvemos los datos
    query.on('end', function() {
      done();
      return res.json(results);
    });

  });
});

module.exports = router;