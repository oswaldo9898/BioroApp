'use strict'
const util = require('util');
const connection = require('../config/connection');
const query = util.promisify(connection.query).bind(connection);


const listar_areas = async function(req, res){    
    const {idlocaciones, idarea, idhidro} = req.params;

    try{
        let sql = `select distinct
        locaciones.id_locacion,
        areas_naturales_conservacion.id_areanatural,
        unidades_hidrograficas.id_uh,
        areas_naturales_conservacion.desc_area,
        geologias.nom_geologia AS nom_geo
        from 
        ((((((((((
        areanatural_locacion
        JOIN areas_naturales_conservacion)
        JOIN areanatural_geologia)
        JOIN geologias)
        JOIN cantones)
        JOIN locaciones)
        JOIN biomas)
        JOIN ecosistemas)
        JOIN abundancias_ecosistemas)
        JOIN abundancias_uh)
        JOIN unidades_hidrograficas)
        where
        ((areanatural_locacion.id_areanatural = areas_naturales_conservacion.id_areanatural)
            AND (cantones.id_canton = areanatural_locacion.id_canton)
            AND (locaciones.id_canton = cantones.id_canton)
            AND (biomas.id_bioma = locaciones.id_bioma)
            AND (ecosistemas.id_bioma = biomas.id_bioma)
            AND (areanatural_geologia.id_areanatural = areas_naturales_conservacion.id_areanatural)
            AND (geologias.id_geologia = areanatural_geologia.id_geologia)
            AND (abundancias_ecosistemas.id_ecosistema = ecosistemas.id_ecosistema)
            AND (abundancias_uh.id_abundancia = abundancias_ecosistemas.id_abundancia)
            AND (unidades_hidrograficas.id_uh = abundancias_uh.id_uh)
            AND (locaciones.id_locacion = ${connection.escape(idlocaciones)})
            AND (areas_naturales_conservacion.id_areanatural = ${connection.escape(idarea)})
            AND (unidades_hidrograficas.id_uh = ${connection.escape(idhidro)}))`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

const ver_area = async function(req, res){    
    const {idlocaciones, idarea, idhidro, geologia} = req.params;

    try{
        let sql = `select distinct
        areas_naturales_conservacion.nombre_area AS nom_area,
        areas_naturales_conservacion.desc_area,
        areanatural_locacion.km_cuadrados,
        cantones.nom_canton,
        locaciones.nom_locacion,
        locaciones.sigla_locacion,
        locaciones.latitud_locacion AS latitud,
        locaciones.longitud_locacion AS longitud,
        biomas.nom_bioma,
        biomas.sigla_bioma,
        areanatural_geologia.hec_geologia AS hec_geo,
        geologias.nom_geologia AS nom_geo,
        unidades_hidrograficas.nom_uh
        from 
        ((((((((((
        areanatural_locacion
        JOIN areas_naturales_conservacion)
        JOIN areanatural_geologia)
        JOIN geologias)
        JOIN cantones)
        JOIN locaciones)
        JOIN biomas)
        JOIN ecosistemas)
        JOIN abundancias_ecosistemas)
        JOIN abundancias_uh)
        JOIN unidades_hidrograficas)
        where
        ((areanatural_locacion.id_areanatural = areas_naturales_conservacion.id_areanatural)
            AND (cantones.id_canton = areanatural_locacion.id_canton)
            AND (locaciones.id_canton = cantones.id_canton)
            AND (biomas.id_bioma = locaciones.id_bioma)
            AND (ecosistemas.id_bioma = biomas.id_bioma)
            AND (areanatural_geologia.id_areanatural = areas_naturales_conservacion.id_areanatural)
            AND (geologias.id_geologia = areanatural_geologia.id_geologia)
            AND (abundancias_ecosistemas.id_ecosistema = ecosistemas.id_ecosistema)
            AND (abundancias_uh.id_abundancia = abundancias_ecosistemas.id_abundancia)
            AND (unidades_hidrograficas.id_uh = abundancias_uh.id_uh)
            AND (locaciones.id_locacion = ${connection.escape(idlocaciones)})
            AND (areas_naturales_conservacion.id_areanatural = ${connection.escape(idarea)})
            AND (unidades_hidrograficas.id_uh = ${connection.escape(idhidro)})
            AND (geologias.nom_geologia = ${connection.escape(geologia)}))`
        const reg = await query(sql);
        res.status(200).send(reg);
    }catch(error) {
        console.log(`Surguió el siguiente error: ${error}`);
    }
};

module.exports = {
    listar_areas,
    ver_area
};