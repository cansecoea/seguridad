'use strict'
 
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: 'Insert a username please',
        index: {
            unique: true,
            dropDups: true
        }
    },
    email: {
        type: String,
        trim: true,
        required: 'Insert an email please',
        index: {
            unique: true,
            dropDups: true
        }
    },
    password: {
        type: String,
        trim: true,
        required: 'Insert a password please',
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
    role: {
        type: String,
        trim: true,
        default:'ROLE_USER',
        index: {
            unique: false,
            dropDups: true
        },
        enum: [
            'ROLE_USER',
            'ROLE_ADMIN'
        ]
    }
}, {
    timestamps: true
});
 
var User = mongoose.model('User', UserSchema);
module.exports = User;