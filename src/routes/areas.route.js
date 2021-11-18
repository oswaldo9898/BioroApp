'use strict'
const { Router } = require('express');
const api = Router();
var areasController = require('../controllers/areasController');


api.get('/listar_areas/:idlocaciones/:idarea/:idhidro', areasController.listar_areas);
api.get('/ver_area/:idlocaciones/:idarea/:idhidro/:geologia', areasController.ver_area);

module.exports = api;