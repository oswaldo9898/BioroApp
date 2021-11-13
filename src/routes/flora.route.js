'use strict'
const { Router } = require('express');
const api = Router();
var floraController = require('../controllers/floraController');

api.get('/listar_flora/:idlocaciones/:tipo', floraController.listar_flora);
api.get('/ver_flora/:id', floraController.ver_flora);
api.get('/obtener_portada_flora/:img', floraController.obtener_portada_flora);

module.exports = api;