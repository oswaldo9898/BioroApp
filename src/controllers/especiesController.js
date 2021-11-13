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
        let sql = `select especies.id_especie, especies.nom_especie, especie_locaciones.id_locacion, imagenes.imagen
        from especies 
        inner join especie_locaciones on especies.id_especie = especie_locaciones.id_especie
        inner join locaciones on especie_locaciones.id_locacion = locaciones.id_locacion
        left join imagenes on especies.id_especie = imagenes.id_especie
        where locaciones.id_locacion = ${connection.escape(idlocaciones)} and especies.tipo = ${connection.escape(tipo)} ;`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

const ver_fauna = async function(req, res){    
    const {id} = req.params;
    try{
        let sql = `select especies.id_especie, especies.nom_especie, especies.nom_cientifico, especies.nom_ingles,
        especies.tipo, especies.rango_altitudinal, especies.ubicacion, especies.descripcion,
        personas.ape_persona, estado_conservacion.categoria as estadoconservacion, 
        especies.anio_descubrimiento, nichotrofico.nom_nicho, clases.nom_clase, ordenes.nom_orden,
        familias.nom_familia, actividades.nom_actividad, imagenes.imagen, imagenes.autor_imagen
        from especies 
        left join especie_locaciones on especies.id_especie = especie_locaciones.id_especie
        left join personas on especies.id_persona = personas.id_persona
        left join estado_conservacion on especies.id_estado_conservacion = estado_conservacion.id_estado_conservacion
        left join nichotrofico on especies.id_nicho_trofico = nichotrofico.id_nicho_trofico
        left join ordenes on especies.id_orden = ordenes.id_orden
        left join clases on especies.id_clase = clases.id_clase
        left join familias on especies.id_familia = familias.id_familia
        left join especies_actividades on especies.id_especie = especies_actividades.id_especie
        left join actividades on especies_actividades.id_actividad = actividades.id_actividad
        left join imagenes on especies.id_especie = imagenes.id_especie
        where especies.id_especie =${connection.escape(id)};`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

const listar_fauna_peces = async function(req, res){
    const {id} = req.params;
    try{
        let sql = `select especies.id_especie, especies.nom_especie
		from especies 
        left join especies_localidades_muestreo on especies.id_especie = especies_localidades_muestreo.id_especie
        left join localidades_muestreo on localidades_muestreo.id_muestreo = especies_localidades_muestreo.id_muestreo 
        where especies.tipo = 'Pez' and localidades_muestreo.id_muestreo = ${connection.escape(id)};`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

const listar_fauna_abundancia = async function(req, res){
    const {idlocaciones} = req.params;
    try{
        let sql = `select abundancias.id_abundancia as id_especie, abundancias.tax_abundancia as nom_especie 
        from abundancias 
        inner join abundancias_ecosistemas on abundancias.id_abundancia = abundancias_ecosistemas.id_abundancia
        inner join ecosistemas on abundancias_ecosistemas.id_ecosistema = ecosistemas.id_ecosistema
        inner join biomas_ecosistemas on biomas_ecosistemas.id_ecosistema = ecosistemas.id_ecosistema
        inner join locaciones on biomas_ecosistemas.id_bioma = locaciones.id_bioma 
        where locaciones.id_locacion = ${connection.escape(idlocaciones)}`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

const ver_fauna_abundancia = async function(req, res){    
    const {id} = req.params;
    try{
        let sql = `select abundancias.tax_abundancia, abundancias.ran_abundancia, familias.tipo, familias.nom_familia,
		ordenes.nom_orden, clases.nom_clase from abundancias 
        left join familias on abundancias.id_familia = familias.id_familia 
        left join ordenes on familias.id_orden = ordenes.id_orden 
        left join clases on ordenes.id_clase = clases.id_clase
        where abundancias.id_abundancia = ${connection.escape(id)}`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
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
        console.log(`Surguió el siguiente error: ${error}`);
    }
}

module.exports = {
    listar_fauna,
    ver_fauna,
    obtener_portada_especie,
    listar_fauna_peces,
    listar_fauna_abundancia,
    ver_fauna_abundancia
};