// Dependencias
var pg = require('pg');

// Inserción de datos
exports.insert = function(req, res) {
  // Obtener datos a insertar de la petición http
  var data = {
    empresa: req.body.empresa,
    alumno: req.body.alumno,
    calificacion: req.body.calificacion,
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

    // Consulta de inserción
    client.query("INSERT INTO calificaciones(empresa, alumno, calificacion) VALUES($1, $2, $3)", [data.empresa, data.alumno, data.calificacion]);

    // Consulta de selección
    var query = client.query("SELECT * FROM calificaciones");

    // Cerramos la conexión y devolvemos un mensaje de confirmación
    query.on('end', function() {
      done();
      res.render('index', {
        mensaje: "Inserción realizada correctamente"
      });
    });
  });
};

// Consulta de datos
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

      res.render('index', res.json(results));
    });
  });
};

// Actualización de datos
exports.update = function(req, res) {
  // Obtenemos identificador de los parámetros de la URL
  var id = req.params.id;

  // Obtener calificación nueva de petición http
  var data = {
    calificacion: req.body.calificacion,
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
    client.query("UPDATE calificaciones SET calificacion=($1) WHERE id=($2) ", [data.calificacion, id]);

    // Consulta de selección
    var query = client.query("SELECT * FROM calificaciones");

    // Cerramos la conexión y devolvemos un mensaje de confirmación
    query.on('end', function() {
      done();
      res.render('index', {
        mensaje: "Actualización realizada correctamente"
      });
    });
  });
};

// Borrado de datos
exports.delete = function(req, res) {
  // Obtenemos identificador de los parámetros de la URL
  var id = req.params.id;

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
    client.query("DELETE FROM calificaciones WHERE id=($1)", [id]);

    // Consulta de selección
    var query = client.query("SELECT * FROM calificaciones");

    // Cerramos la conexión y devolvemos un mensaje de confirmación
    query.on('end', function() {
      done();
      res.render('index', {
        mensaje: "Borrado realizado correctamente"
      });
    });
  });
};
