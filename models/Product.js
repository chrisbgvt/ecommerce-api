const mongoose = require("mongoose");

const schemaProduct = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        min: [2, 'Title must be at least 2 carecters long'],
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
    quantity: {
        type: Number,
        required: true,
        min: 0.01
    },
    description: {
        type: String,
        required: true,
        min: [10, 'Description must be at least 10 symbols']
    }
})

const Product = mongoose.model('Product', schemaProduct);

module.exports = Product;