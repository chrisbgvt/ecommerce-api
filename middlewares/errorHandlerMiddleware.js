const { getErrorMessage } = require('../utils/errorHelpers');

exports.errorHandler = (err, req, res, next) => {
    const status = err.status || 404;
    // const errorMessage = err.message || 'Something went wrong!';
    
    res.status(status).json({ error: getErrorMessage(err) });
};