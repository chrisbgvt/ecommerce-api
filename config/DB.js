const mongoose = require('mongoose');
const { DB_QUERY_STRING } = require('./env')

const url = DB_QUERY_STRING;
exports.initializeDatabase = () => {
    mongoose.connection.on('open', () => console.log('DB Connected'));

    return mongoose.connect(url)
};