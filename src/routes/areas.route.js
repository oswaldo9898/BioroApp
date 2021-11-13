'use strict'
const { Router } = require('express');
const api = Router();
var areasController = require('../controllers/areasController');


api.get('/listar_areas/:idlocaciones/:nomarea', areasController.listar_areas);


module.exports = api;