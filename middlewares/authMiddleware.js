const jwt = require('jsonwebtoken');
// const { COOKIE_SESSION_NAME } = require('../constants');
const {promisify}  = require('util');

const { SECRET } = require('../config/env');

const jwtVerify = promisify(jwt.verify);


exports.auth = async (req, res, next) => {
    let token = req.headers['x-authorization'];

    if (token) {
        try {
            let decodedToken = await jwtVerify(token, SECRET);
            
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        } catch(err) {
            // res.clearCookie(COOKIE_SESSION_NAME);
            // return next(err);
            res.status(500).json({message: 'Not Authorised'});
        }
    } else if (!token && (req.path != '/auth/login' && req.path != '/auth/register')) {
        return res.status(500).json({message: 'Provide token in request headers'});
    } else {
        next();
    }

};

exports.isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({message: 'User must be admin to add, edit or delete product'});
    }

    next();
}

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}

exports.isLoggedUser = (req, res, next) => {
    if(req.user) {
        return res.redirect('/');
    }

    next();
}