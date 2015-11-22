#!/usr/bin/env nodejs

var request = require("supertest");
var should = require("should");
var app = require('../app.js');

describe('Operaciones', function() {
  it("SELECT", function(done) {
    request(app)
      .get("/")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });
  it("INSERT", function(done) {
    request(app)
      .get("/insert/prueba/prueba/0")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });
  it("UPDATE", function(done) {
    request(app)
      .get("/update/1/100")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });
  it("DELETE", function(done) {
    request(app)
      .get("/delete/1")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });
  it("Página de error", function(done) {
  request(app)
    .get("/foo")
    .expect(404)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      done();
    });
});
});
