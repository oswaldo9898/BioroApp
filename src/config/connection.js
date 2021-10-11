'use strict'
const mysql = require('mysql'),
    data = require('./datosPrivados.json'),

    objectConnection = {
        host: data.mysql.host,
        port: data.mysql.port,
        user: data.mysql.user,
        password: data.mysql.password,
        database: data.mysql.database
    }

    const myConn = mysql.createConnection(objectConnection)

    /**myConn.connect((error) => {
        if(error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }else{
            console.log('Base de datos conectada');
        }
    })*/

    module.exports = myConn;