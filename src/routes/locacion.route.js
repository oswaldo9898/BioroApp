'use strict'
const { Router } = require('express');
const api = Router();
var locacionController = require('../controllers/locacionController');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'uploads/locacion'});


api.get('/listar_locaciones', locacionController.listar_locaciones);
api.post('/guardar_portada_locacion/:id',path, locacionController.guardar_portada_locacion);
api.get('/obtener_portada/:img', locacionController.obtener_portada);
api.get('/listar_locaciones_muestreo', locacionController.listar_locaciones_muestreo);

module.exports = api;