const Order = require('../models/Order');

exports.create = (order) => Order.create(order);

exports.getOrdersOfUser = (userId) => Order.find({userId: userId});