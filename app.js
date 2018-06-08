'use strict'
 
var express = require('express'),
    bodyParser = require('body-parser');
 
var app = express();
 
var user_routes = require('./routes/user')
var product_routes = require('./routes/product')
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
app.use(function(req, res, next) {
    //Puede ser consumida desde cualquier lugar
    res.header('Access-Control-Allow-Origin', '*');
    //Cabeceras permitidas
    res.header('Access-Control-Allow-Headers', 'X-API-KEY,Origin,X-Requested-With,Content-Type, Accept, Access-Control-Request-Method');
    //Metodos Permitidos
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Allow', 'GET,POST,PUT,DELETE');
    next();
});
 
app.use('/api', user_routes)
app.use('/api', product_routes)
 
module.exports = app;