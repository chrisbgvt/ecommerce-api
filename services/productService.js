const Product = require('../models/Product');

exports.create = (product) => Product.create(product);

exports.getAll = () => Product.find();

exports.getById = (productId) => Product.findById(productId);

// exports.getByIdPopulated = (id) => Product.findById(id).populate('creator');

exports.edit = (id, productData) => Product.findByIdAndUpdate(id, productData);

exports.delete = (id) => Product.deleteOne({_id: id});