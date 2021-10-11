'use strict'
const app = require('./app');

///importar database
require('./config/connection');

app.listen(app.get('port'), (error) => {
    if (error) {
        console.log(`Sucedio un error: ${error}`);
    }else{
        console.log(`Servidor corriendo en el puerto: ${app.get('port')}`);
    }
});