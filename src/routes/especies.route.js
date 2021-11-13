'use strict'
const { Router } = require('express');
const api = Router();
var especiesController = require('../controllers/especiesController');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'uploads/especie'});


api.get('/listar_fauna/:idlocaciones/:tipo', especiesController.listar_fauna);
api.get('/ver_fauna/:id', especiesController.ver_fauna);
api.get('/obtener_portada_especie/:img', especiesController.obtener_portada_especie);
api.get('/listar_fauna_peces/:id', especiesController.listar_fauna_peces);
api.get('/listar_fauna_abundancia/:idlocaciones', especiesController.listar_fauna_abundancia);
api.get('/ver_fauna_abundancia/:id', especiesController.ver_fauna_abundancia);


module.exports = api;