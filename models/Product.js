const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        min: [2, 'Name must be at least 2 carecters long'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator: function() {
                return this.image.startsWith('http');
            },
            message: "Image need to be a link"
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    description: {
        type: String,
        required: true,
        min: [10, 'Description must be at least 10 symbols']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Type is required'],
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']
    },
    buyCrypto: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Product = mongoose.model('Product', schemaProduct);

module.exports = Product;