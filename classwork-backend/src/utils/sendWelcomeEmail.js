const createTransporter = require('../config/nodemailer');
const { generateWelcomeEmail } = require('./welcomeEmailTemplate');

async function sendWelcomeEmail(toEmail, username) {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Welcome to Blogify!',
    html: generateWelcomeEmail(username),
  };
  await transporter.sendMail(mailOptions);
}

module.exports = sendWelcomeEmail;
