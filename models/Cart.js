const mongoose = require("mongoose");

const schemaCart = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: [true, 'ProductId is required'],
            },
            title: {
                type: String,
                required: [true, 'Title is required'],
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
                required: [true, 'Price is required'],
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
            }
        }
    ],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
})

const Cart = mongoose.model('Cart', schemaCart);

module.exports = Cart;