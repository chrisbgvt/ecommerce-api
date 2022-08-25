const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelpers');
const nodemailer = require('nodemailer');
const Mailjet = require('node-mailjet');


router.post('/', async (req, res) => {
    const { email, subject, text } = req.body;

    const mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC || '4ad5b6dbad638414b448b29b7c392008',
        apiSecret: process.env.MJ_APIKEY_PRIVATE || 'd8e4e7a0e316d90f420e606459e27d2d'
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