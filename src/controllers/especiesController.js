'use strict'
const util = require('util');
const connection = require('../config/connection');
const query = util.promisify(connection.query).bind(connection);
var fs = require('fs');
var path = require('path');


const listar_fauna = async function(req, res){
    
    const {idlocaciones} = req.params;
    const {tipo} = req.params;
    try{
        let sql = `select especies.id_especie, especies.nom_especie, especie_locaciones.id_locacion
        from especies 
        inner join especie_locaciones on especies.id_especie = especie_locaciones.id_especie
        inner join locaciones on especie_locaciones.id_locacion = locaciones.id_locacion
        where locaciones.id_locacion = ${connection.escape(idlocaciones)} and especies.tipo = ${connection.escape(tipo)} ;`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguio el siguiente error: ${error}`);
    }
};

const ver_fauna = async function(req, res){    
    const {id} = req.params;
    try{
        let sql = `select especies.id_especie, especies.nom_especie, especies.nom_cientifico, especies.nom_ingles,
        especies.tipo, especies.rango_altitudinal, especies.ubicacion, especies.descripcion,
        personas.nom_persona as autor, estado_conservacion.categoria as estadoconservacion
        from especies 
        inner join especie_locaciones on especies.id_especie = especie_locaciones.id_especie
        left join personas on especies.id_persona = personas.id_persona
        inner join estado_conservacion on especies.id_estado_conservacion = estado_conservacion.id_estado_conservacion
        where especies.id_especie =${connection.escape(id)};`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguio el siguiente error: ${error}`);
    }
};

const obtener_portada_especie = async function(req, res){
    try {
        var img = req.params['img'];
        fs.stat('./uploads/especie/'+img, function(err){
            if(!err){
                let path_img = './uploads/especie/'+img;
                res.status(200).sendFile(path.resolve(path_img));
            }else{
                let path_img = './uploads/default.png';
                res.status(200).sendFile(path.resolve(path_img));
            }
        });
    }catch(error) {
        console.log(`Surguio el siguiente error: ${error}`);
    }
}


module.exports = {
    listar_fauna,
    ver_fauna,
    obtener_portada_especie
};