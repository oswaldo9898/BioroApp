'use strict'
const { Router } = require('express');
const api = Router();
var areasController = require('../controllers/areasController');


api.get('/:idlocaciones', areasController.listar_areas);


module.exports = api;