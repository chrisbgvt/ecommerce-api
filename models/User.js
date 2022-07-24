const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../config/env');

const schemaUser = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required']
    },
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cart'
        }
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Order'
        }
    ],
})

schemaUser.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {
            this.password = hashedPassword;

            next();    
        })
})

const User = mongoose.model('User', schemaUser);

module.exports = User;