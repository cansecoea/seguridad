'use strict'
 
var bcrypt = require('bcrypt-nodejs');
var Product = require('../models/product');
var jwt = require('../services/jwt');
var mongoose = require('mongoose');
 
exports.productValidation = function productValidation(req,res,next){
    //VERIFICAR UN BODY VACIO
    if (Object.keys(req.body).length === 0) {
        res.status(409).send({ message: 'Please send a body' })
    } else {
        if (req.body.name) {
            req.body.name = req.body.name.toLowerCase();
        }
        if (req.body.brand) {
            req.body.brand = req.body.brand.toLowerCase()
        }
        next();
    }
};
 
exports.productIdParamsValidation = function(req,res,next){
    //Verificamos que el id proporcionado en la url sea valido
    if(req.params.productId){
         if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
            //Si no es valido mostramos un mensaje de Id invalido
            res.status(409).send({ message: 'Invalid id' });
         }else{
            next()
         }
    }else{
        res.status(409).send({ message: 'Provide a productId' });
    }
}
 
exports.findProductById = function(req,res,next){
    req.productObj = {};
    //Buscamos  por _id
    req.productObj = Product.findOne({_id:req.params.productId}).exec();
    next()
}
 