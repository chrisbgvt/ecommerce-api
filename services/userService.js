const User = require('../models/User');

exports.getById = (userId) => User.findById(userId);

exports.getByIdPopulated = (userId) => User.findById(userId).populate('cart');