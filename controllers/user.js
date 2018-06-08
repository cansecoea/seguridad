'use strict'
 
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var mongoose = require('mongoose');
var jwt = require('../services/jwt');
 
function initPostUser(req,res,next){
    var newUser = new User(req.body)
    req.newUserObj = {}
 
    if (req.body.password) {
        //Ciframos contraseña y guardamos
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
            newUser.password = hash;
        });
    }
 
    req.newUserObj = newUser;
 
    next();
}
 
function postUser(req,res){
    req.newUserObj.save(function(err, userStored) {
        if (err) {
            res.status(409).send({ err })
        } else {
            if (userStored) {
                res.status(200).send({ user: userStored })
            }
        }
    });
}
 
function loginUser(req, res) {
     req.userObj.then((user)=>{
        if(user != null){
            //Comprobamos la contraseña
            bcrypt.compare(req.body.password, user.password, function(error, check) {
                if (check) {
                    //Devolvemos al usuario logeado
                    //Generaremos un TOKEN
                    if (req.body.token) {
                        //Devolvemos un token
                        var token = jwt.createToken(user)
                        res.status(200).send({ token: token, user: user })
                    } else {
                        res.status(200).send({ user: user })
                    }
                } else {
                    res.status(409).send({ error: 'Invalid password' })
                }
            });
        }else{
            res.status(404).send({message:"User not found"})
        }
     })
     .catch((err) => {
        res.status(500).send({ message: 'Internal server error',err:err });
    });        
}
 
function deleteUser(req,res){
    if(req.user.role=='ROLE_ADMIN'){
        //res.status(200).send({message:"ES ADMIN",user:req.user})
        req.userObj.then((user)=>{
            if(user != null){
                if(req.user.role != user.role || req.user.sub == user._id) {
                    User.findByIdAndRemove(user._id).exec().then((usuarioBorrado) => {
                        res.status(200).send({message: "Usuario borrado", data: usuarioBorrado});
                    });
                } else {
                    res.status(401).send({message:"Un usuario administrador NO puede borrar a otro administrador",
                                          user:req.user, userAborrar:user})            
                }
            }else{
                res.status(404).send({message:"Usuario a borrar no encontrado"})
            }
         })
         .catch((err) => {
            res.status(500).send({ message: 'Internal server error',err:err });
        });
    }else{
        res.status(401).send({message:"NO ES ADMIN",user:req.user})
    }
}

function getUsers(req, res) {
    var listaUsers = (req.user.role == 'ROLE_ADMIN') ? User.find({}).sort('username').exec()
                                                     : User.find({},{username: 1}).sort('username').exec()

    listaUsers.then((users) => {
        res.status(200).send({data: users})
    })
    .catch((err) => {
        res.status(500).send({ message: 'Internal server error',err:err });
    });
}

function getUser(req, res) {
        req.userObj.then((user)=>{
            if(user != null){
                if(req.user.role == "ROLE_ADMIN" || req.user.sub == user._id) {
                    res.status(200).send({message: "Usuario", data: user});
                } else {
                    res.status(401).send({message:"Usuario no autorizado"})            
                }
            }else{
                res.status(404).send({message:"Usuario a consultar no encontrado"})
            }
         })
         .catch((err) => {
            res.status(500).send({ message: 'Internal server error',err:err });
        });
}

function updateUser(req, res) {
    req.userObj.then((user)=>{
        if(user != null){
            if(req.user.role == "ROLE_ADMIN" || req.user.sub == user._id) {
                req.body.password = req.newUserObj.password
                User.findByIdAndUpdate(user._id, req.body, {new:true}).exec().then((usuarioActualizado) => {
                    res.status(200).send({message: 'Usuario', data: usuarioActualizado});
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Error al actualizar el usuario',err:err });
                });
            } else {
                res.status(401).send({message:"Usuario no autorizado"})            
            }
        }else{
            res.status(404).send({message:"Usuario a actualizar no encontrado"})
        }
     })
     .catch((err) => {
        res.status(500).send({ message: 'Internal server error',err:err });
    });
}

 
module.exports = {
    initPostUser,
    postUser,
    loginUser,
    deleteUser,
    getUsers,
    getUser,
    updateUser
}