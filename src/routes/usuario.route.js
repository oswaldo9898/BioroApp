'use strict'
const { Router } = require('express');
const api = Router();
const{ver_usuario, agregar_usuario, editar_usuario} = require('../controllers/usuarioController');

api.post('/iniciar_sesion', ver_usuario);
api.put('/registrar/', agregar_usuario);
api.put('/cambiar_clave/', editar_usuario);

module.exports = api;