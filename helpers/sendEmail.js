const nodemailer = require('nodemailer');

const config = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: 'olexander.zakatov@meta.ua',
        pass: process.env.MAIL_PASSWORD,
    },
};

const transport = nodemailer.createTransport(config);

const sendEmail = async (mail) => {
    await transport.sendMail({ ...mail, from: 'olexander.zakatov@meta.ua' })
    return true;
};

module.exports = {
    sendEmail
}