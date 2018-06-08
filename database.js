'use strict';
 
//Importamos mongoose
var mongoose = require('mongoose'),
//Archivo de configuración
config = require('./config.js')
 
var connection = mongoose.connect(config.database, function(err) {
    if (err){
        console.log('Error al conectar a la base de datos ');
    }else{
        console.log('Conexion a la Base de datos correcta ')
    }
});