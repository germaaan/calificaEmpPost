#!/usr/bin/env nodejs

var pg = require('pg');

var client = new pg.Client(process.env.DATABASE_URL);
client.connect();
var query = client.query('CREATE TABLE IF NOT EXISTS calificaciones ' +
  '(id SERIAL PRIMARY KEY, empresa VARCHAR(30) NOT NULL, alumno VARCHAR(50) NOT NULL, calificacion INTEGER NOT NULL)');
query.on('end', function() {
  client.end();
});
