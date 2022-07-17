const jwt = require('jsonwebtoken');
const { COOKIE_SESSION_NAME } = require('../constants');
const {promisify}  = require('util');

const { SECRET } = require('../config/env');

const jwtVerify = promisify(jwt.verify);


exports.auth = async (req, res, next) => {
    let token = req.cookies[COOKIE_SESSION_NAME];

    if (token) {
        try {
            let decodedToken = await jwtVerify(token, SECRET);

            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        } catch(err) {
            res.clearCookie(COOKIE_SESSION_NAME);
            // return next(err);
            res.redirect('auth/login');
        }
    } else {
        next();
    }

};

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