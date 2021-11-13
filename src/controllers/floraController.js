'use strict'
const util = require('util');
const connection = require('../config/connection');
const query = util.promisify(connection.query).bind(connection);
var fs = require('fs');
var path = require('path');


const listar_flora = async function(req, res){
    const {idlocaciones} = req.params;
    const {tipo} = req.params;
    try{
        let sql = `select flora.id_flora, flora.nom_flora, flora_locaciones.id_locacion, flora_imagen.imagenflora as imagen
            from flora 
            inner join flora_locaciones on flora.id_flora = flora_locaciones.id_flora
            inner join locaciones on flora_locaciones.id_locacion = locaciones.id_locacion
            left join flora_imagen on flora.id_flora = flora_imagen.id_flora
            where locaciones.id_locacion = ${connection.escape(idlocaciones)} and flora.tipo_flora = ${connection.escape(tipo)} ;`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguio el siguiente error: ${error}`);
    }
};

const ver_flora = async function(req, res){    
    const {id} = req.params;
    try{
        let sql = `select flora.id_flora, flora.nom_flora, flora.tipo_flora, flora.etimologia_flora,
        flora.diagnosis_flora, flora.comentarios_taxonomicos_flora, flora.distribucion_composicion_flora, personas.nom_persona as autor,
        flora_imagen.imagenflora as imagen, flora_imagen.autor_flora_imagen
        from flora 
        inner join flora_locaciones on flora.id_flora = flora_locaciones.id_flora 
        left join personas on flora.autor_flora = personas.id_persona
        left join flora_imagen on flora.id_flora = flora_imagen.id_flora
        where flora.id_flora = ${connection.escape(id)}`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguio el siguiente error: ${error}`);
    }
};

const obtener_portada_flora = async function(req, res){
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
};


module.exports = {
    listar_flora,
    ver_flora,
    obtener_portada_flora
};