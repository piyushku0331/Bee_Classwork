require('dotenv').config();
const NODEMAILER = require('nodemailer');

const createTransporter = () => {
    try {
        const transporter = NODEMAILER.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        console.log('Email transporter created successfully');
        return transporter;
    } catch (error) {
        console.error('Failed to create email transporter:', error);
        throw error; 
    }
}
module.exports = createTransporter;