'use strict'
const util = require('util');
const connection = require('../config/connection');
const query = util.promisify(connection.query).bind(connection);
const bcrypt = require('bcryptjs');
const { json } = require('express');

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }
const ver_usuario = async function(req, res){
    var data = req.body;
    const email = data.email;
    const password = data.password;
    try {
       let sqls = `SELECT password FROM usuarios_app WHERE email = ${connection.escape(email)}`
       const val = await query(sqls);
        if(isEmptyObject(val)){
            res.status(200).send(val);
        }else{
            
            var data = Object.values(JSON.parse(JSON.stringify(val)));
            let compare = bcrypt.compareSync(password,data[0].password);
            if(compare){
            let sql = `SELECT * FROM usuarios_app WHERE email = ${connection.escape(email)} and password = ${connection.escape(data[0].password)}`
            const reg = await query(sql);
            res.status(200).send(reg);
            }else{
            let sql = `SELECT * FROM usuarios_app WHERE email = ${connection.escape(email)} and password = ${connection.escape(password)}`
            const reg = await query(sql);
            res.status(200).send(reg); 
            }
        }
    }catch (error) {
        res.status(404).send({data:'Ocurrio un error',error});
    }
}
const agregar_usuario = async function(req, res){
    var data = req.body;
    const username = data.username;
    const email = data.email;
    const password = data.password;
    try{
        let passwordHash = await bcrypt.hashSync(password, 10)
        let sql = `INSERT INTO usuarios_app(username,email,password) VALUES (${connection.escape(username)},${connection.escape(email)} ,${connection.escape(passwordHash)})`
        const reg = await query(sql);
        console.log('user add');
        res.status(200).send('user add');
    }catch(error){
        console.log('error');
        res.status(409).send("Usuario ya registrado")
    }
}

const editar_usuario = async function(req, res){
    var data = req.body;
    const email = data.email;
    const password = data.password;
    try{
        let passwordHash = await bcrypt.hashSync(password, 10)
        console.log(passwordHash)
        let sql = `UPDATE usuarios_app SET password = ${connection.escape(passwordHash)} WHERE email = ${connection.escape(email)}`
        const reg = await query(sql);
        res.status(200).send('password modificado');
    }catch(error){
        console.log('error');
        res.status(409).send("Ocurrio un error")
    }
}

module.exports = {
    ver_usuario,
    agregar_usuario,
    editar_usuario
};