const mongoose = require("mongoose");

const schemaOrder = new mongoose.Schema({
    titles: {
        type: Array,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
})

const Order = mongoose.model('Order', schemaOrder);

module.exports = Order;