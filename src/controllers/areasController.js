'use strict'
const util = require('util');
const connection = require('../config/connection');
const query = util.promisify(connection.query).bind(connection);


const listar_areas = async function(req, res){    
    const {idlocaciones, nomarea} = req.params;

    try{
        let sql = `SELECT * FROM localidades_areasnaturales where id_locacion = ${connection.escape(idlocaciones)} 
        and nom_area = ${connection.escape(nomarea)}`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

module.exports = {
    listar_areas
};