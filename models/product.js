'use strict'
 
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
 
var ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Insert a name please',
        index: {
            unique: false,
            dropDups: true
        }
    },
    codebar: {
        type: String,
        trim: true,
        required: 'Insert a codebar please',
        index: {
            unique: true,
            dropDups: true
        }
    },
    cost:{
        type: SchemaTypes.Double,
        trim: true,
        required: 'Insert a cost please',
        index: {
            unique: false,
            dropDups: true
        }
    },
    active: {
        type: Boolean,
        default: true,
        index: {
            unique: false,
            dropDups: true
        }
    },
     brand:{
        type: String,
        trim: true,
        required: 'Insert a brand please',
        index: {
            unique: false,
            dropDups: true
        }
    }
}, {
    timestamps: true
});
 
var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;