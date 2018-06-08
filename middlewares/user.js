'use strict'
 
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var mongoose = require('mongoose');
 
exports.userValidation = function userValidation(req,res,next){
    //VERIFICAR UN BODY VACIO
    if (Object.keys(req.body).length === 0) {
        res.status(409).send({ message: 'Please send a body' })
    } else {
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }
        if (req.body.username) {
            req.body.username = req.body.username.toLowerCase()
        }
        next();
    }
};
 
exports.userIdParamsValidation = function(req,res,next){
    //Verificamos que el id proporcionado en la url sea valido
    if(req.params.userId){
         if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            //Si no es valido mostramos un mensaje de Id invalido
            res.status(409).send({ message: 'Invalid id' });
         }else{
            next()
         }
    }else{
        res.status(409).send({ message: 'Provide a userId' });
    }
}
 
exports.findUserById = function(req,res,next){
    req.userObj = {};
    //Buscamos usuario por _id
    req.userObj = User.findOne({_id:req.params.userId}).exec();
    next()
}
 
exports.findUserByEmail = function findUserByEmail(req,res,next){
    req.userObj = {};
    req.userObj = User.findOne({email:req.body.email.toLowerCase()}).exec();
    next()
}