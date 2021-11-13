'use strict'
const util = require('util');
const connection = require('../config/connection');
const query = util.promisify(connection.query).bind(connection);
var fs = require('fs');
var path = require('path');


const listar_locaciones = async function(req, res){
    try{
        let sql = `SELECT locaciones.id_locacion, locaciones.nom_locacion, locaciones.sigla_locacion, 
        locaciones.alt_locacion, parroquias.nom_parroquia as nombre_parroquia, cantones.nom_canton as nombre_canton, 
        locaciones.latitud_locacion, locaciones.longitud_locacion, biomas.nom_bioma as bioma FROM locaciones inner join parroquias 
        on locaciones.id_parroquia = parroquias.id_parroquia inner join cantones on locaciones.id_canton = cantones.id_canton
        left join biomas on locaciones.id_bioma = biomas.id_bioma`;
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

const listar_locaciones_muestreo = async function(req, res){
    try{
        let sql = `SELECT localidades_muestreo.id_muestreo, localidades_muestreo.nom_muestreo, localidades_muestreo.des_muestreo, localidades_muestreo.tipo_animal_muestreo, 
        localidades_muestreo.log_muestreo, localidades_muestreo.lat_muestreo, localidades_muestreo.alt_muestreo, rios.categoria, cantones.nom_canton 
        from localidades_muestreo
        left join estaciones_muestreos on localidades_muestreo.id_em = estaciones_muestreos.id_em
        left join rios on  estaciones_muestreos.id_rio = rios.id_rio
        left join cantones_rios on rios.id_rio = cantones_rios.id_rio
        left join cantones on cantones_rios.id_canton = cantones.id_canton`;
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

const guardar_portada_locacion = async function(req, res){
    try{
        var idlocacion = req.params['id'];
        var img_path = req.files.portada.path;
        var name = img_path.split('\\');
        var portada_name = name[2];
        console.log(name);
        let sql = `UPDATE locaciones SET foto=${connection.escape(portada_name)} WHERE idlocaciones=${connection.escape(idlocacion)};`;
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

const obtener_portada = async function(req, res){
    try {
        var img = req.params['img'];
        fs.stat('./uploads/locacion/'+img, function(err){
            if(!err){
                let path_img = './uploads/locacion/'+img;
                res.status(200).sendFile(path.resolve(path_img));
            }else{
                let path_img = './uploads/default.png';
                res.status(200).sendFile(path.resolve(path_img));
            }
        });
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
}

module.exports = {
    listar_locaciones,
    guardar_portada_locacion,
    obtener_portada,
    listar_locaciones_muestreo
};