'use strict'
const util = require('util');
const connection = require('../config/connection');
const query = util.promisify(connection.query).bind(connection);


const listar_areas = async function(req, res){
    
    const {idlocaciones} = req.params;

    try{
        let sql = `SELECT * FROM area WHERE idlocaciones = ${connection.escape(idlocaciones)}`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguio el siguiente error: ${error}`);
    }
};


module.exports = {
    listar_areas
};