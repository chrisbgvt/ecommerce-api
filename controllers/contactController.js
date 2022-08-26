const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelpers');
const nodemailer = require('nodemailer');
const Mailjet = require('node-mailjet');
const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = require('../config/env');


router.post('/', async (req, res) => {
    const { email, subject, text } = req.body;

    const mailjet = new Mailjet({
        apiKey: MJ_APIKEY_PUBLIC || 'your-api-key',
        apiSecret: MJ_APIKEY_PRIVATE || 'your-api-secret'
    });

    const transporter = nodemailer.createTransport({
        service: 'mailjet',
        auth: {
            user: mailjet.apiKey,
            pass: mailjet.apiSecret
        }
    });
    
    const mailOptions = {
        from: email,
        to: 'delux_hp@abv.bg',
        subject: subject,
        text: text
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            res.status(500).json({error: getErrorMessage(err)});
        } else {
            res.status(200).json({message: 'Message send!'});
        }
    });
});

module.exports = router;