const Product = require('../models/Product');

exports.create = (product) => Product.create(product);

exports.getAll = () => Product.find();

exports.getById = (productId) => Product.findById(productId);

// exports.getByIdPopulated = (id) => Product.findById(id).populate('creator');

exports.edit = (id, productData) => Product.findByIdAndUpdate(id, productData);

exports.deductQty = (id, productQty, orderedQty) => Product.findByIdAndUpdate({_id: id}, {$set: {quantity: productQty - orderedQty}});

exports.delete = (id) => Product.deleteOne({_id: id});

exports.getLastThree = () => Product.find().sort({"_id": -1}).limit(3);