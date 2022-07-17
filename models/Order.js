const mongoose = require("mongoose");

const schemaOrder = new mongoose.Schema({
    products: {
        type: Array,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0.01
    },
})

const Order = mongoose.model('Order', schemaOrder);

module.exports = Order;