'use strict'
 
var bcrypt = require('bcrypt-nodejs');
var Product = require('../models/product');
var mongoose = require('mongoose');
var jwt = require('../services/jwt');
  
function postProduct(req,res){
    var product = new Product(req.body)

    product.save(function(err, productStored) {
        if (err) {
            res.status(409).send({ err })
        } else {
            if (productStored) {
                res.status(200).send({ product: productStored })
            }
        }
    });
} 
 
function deleteProduct(req,res){        
        req.productObj.then((product)=>{
            if(product != null){
                Product.findByIdAndRemove(product._id).exec().then((productoBorrado) => {
                    res.status(200).send({message: "Usuario borrado", data: productoBorrado});
                });
                
            }else{
                res.status(404).send({message:"Producto a borrar no encontrado"})
            }
         })
         .catch((err) => {
            res.status(500).send({ message: 'Internal server error',err:err });
        });
}

function getProducts(req, res) {
    var listaProducts = Product.find({}).sort('name').exec()

    listaProducts.then((products) => {
        res.status(200).send({data: products})
    })
    .catch((err) => {
        res.status(500).send({ message: 'Internal server error',err:err });
    });
}

function getProduct(req, res) {
        req.productObj.then((product)=>{
            if(product != null){        
                res.status(200).send({message: "Producto", data: product});
            }else{
                res.status(404).send({message:"Producto a consultar no encontrado"})
            }
         })
         .catch((err) => {
            res.status(500).send({ message: 'Internal server error',err:err });
        });
}

function updateProduct(req, res) {
    req.productObj.then((product)=>{
        if(product != null){
            Product.findByIdAndUpdate(product._id, req.body, {new:true}).exec().then((productoActualizado) => {
                res.status(200).send({message: 'Usuario', data: productoActualizado});
            })
            .catch((err) => {
                res.status(500).send({ message: 'Error al actualizar el producto',err:err });
            });
        }else{
            res.status(404).send({message:"Producto a actualizar no encontrado"})
        }
     })
     .catch((err) => {
        res.status(500).send({ message: 'Internal server error',err:err });
    });
}

 
module.exports = {
    postProduct,
    deleteProduct,
    getProducts,
    getProduct,
    updateProduct
}