const Cart = require('../models/Cart');

exports.create = (cart) => Cart.create(cart);

exports.getAll = () => Cart.find();

exports.getById = (cartId) => Cart.findById(cartId);

// exports.getByIdPopulated = (id) => Product.findById(id).populate('creator');

exports.edit = (id, cartData) => Cart.findByIdAndUpdate(id, cartData);

exports.delete = (id) => Cart.deleteOne({_id: id});