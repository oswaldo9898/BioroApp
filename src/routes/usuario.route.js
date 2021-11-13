'use strict'
const { Router } = require('express');
const api = Router();
const{ver_usuario, register, editar_usuario} = require('../controllers/usuarioController');

api.get('/iniciar_sesion/:email/:password', ver_usuario);
api.post('/registrarse/', register);
api.put('/editar_usuario/', editar_usuario);

module.exports = api;