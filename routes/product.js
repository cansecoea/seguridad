'use strict'
 
var express = require('express');
var ProductController = require('../controllers/product');
 
var api = express.Router();
var md_auth = require('../middlewares/authenticated')
var md_product = require('../middlewares/product')
 
api.post('/product/register',
                md_auth.ensureAuth,
                md_auth.ensureAuth_as_ROLE_ADMIN,
                md_product.productValidation,
                ProductController.postProduct);
 
api.delete('/product/delete/:productId?',
                md_auth.ensureAuth,
                md_auth.ensureAuth_as_ROLE_ADMIN,
                md_product.productIdParamsValidation,
                md_product.findProductById,
                ProductController.deleteProduct
                )
                 
api.get('/product/products',
                ProductController.getProducts)

api.get('/product/product/:productId?',
                md_product.productIdParamsValidation,
                md_product.findProductById,
                ProductController.getProduct)

api.put('/product/product/:productId?',
                md_auth.ensureAuth,
                md_auth.ensureAuth_as_ROLE_ADMIN,
                md_product.productIdParamsValidation,
                md_product.productValidation,
                md_product.findProductById,
                ProductController.updateProduct)
 
module.exports = api;