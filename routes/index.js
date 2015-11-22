// Dependencias
var pg = require('pg');

// Selección de datos
exports.select = function(req, res) {
  var results = [];

  // Conectar con el cliente PostgreSQL
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    // Consulta de selección
    var query = client.query("SELECT * FROM calificaciones");

    // Devolvemos los resultados de la consulta de selección
    query.on('row', function(row) {
      results.push(row);
    });

    // Cerramos la conexión y devolvemos los datos
    query.on('end', function() {
      done();

      res.json(results);
    });
  });
};

// Inserción de datos
exports.insert = function(req, res) {
  var results = [];

  // Conectar con el cliente PostgreSQL
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    // Consulta de inserción
    client.query("INSERT INTO calificaciones(empresa, alumno, calificacion) VALUES($1, $2, $3)", [req.params.empresa, req.params.alumno, req.params.calificacion]);

    // Consulta de selección
    var query = client.query("SELECT * FROM calificaciones");

    // Devolvemos los resultados de la consulta de selección
    query.on('row', function(row) {
      results.push(row);
    });

    // Cerramos la conexión y devolvemos los datos
    query.on('end', function() {
      done();

      res.json(results);
    });
  });
};

// Actualización de datos
exports.update = function(req, res) {
  var results = [];

  // Obtener calificación de los parámetros de la URL
  var data = {
    id: req.params.id,
    calificacion: req.params.calificacion,
  };

  // Conectar con el cliente PostgreSQL
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    // Consulta de actualización
    client.query("UPDATE calificaciones SET calificacion=($1) WHERE id=($2) ", [data.calificacion, data.id]);

    // Consulta de selección
    var query = client.query("SELECT * FROM calificaciones");

    // Devolvemos los resultados de la consulta de selección
    query.on('row', function(row) {
      results.push(row);
    });

    // Cerramos la conexión y devolvemos los datos
    query.on('end', function() {
      done();

      res.json(results);
    });
  });
};

// Borrado de datos
exports.delete = function(req, res) {
  var results = [];

  // Obtenemos identificador de los parámetros de la URL
  var data = {
    id: req.params.id
  };

  // Conectar con el cliente PostgreSQL
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }

    // Consulta de Borrado
    client.query("DELETE FROM calificaciones WHERE id=($1)", [data.id]);

    // Consulta de selección
    var query = client.query("SELECT * FROM calificaciones");

    // Devolvemos los resultados de la consulta de selección
    query.on('row', function(row) {
      results.push(row);
    });

    // Cerramos la conexión y devolvemos los datos
    query.on('end', function() {
      done();

      res.json(results);
    });
  });
};
