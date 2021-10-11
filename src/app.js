'use strict'
const express = require('express');
const port = (process.env.PORT || 3000);

const app = express();
var usuario_route = require('./routes/usuario.route');
var locacion_route = require('./routes/locacion.route');
var especies_route = require('./routes/especies.route');
var areas_route = require('./routes/areas.route');

//setings
app.set('port', port);


//middlewars
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//routes
app.use('/api', usuario_route);
app.use('/api', locacion_route);
app.use('/api', especies_route);
app.use('/api', areas_route);

//exportar
module.exports = app;