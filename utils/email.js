const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

const newTransport = () => {
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const sendEmail = async (user, url, template, subject) => {
  const firstName = user.name.split(' ')[0];
  const from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;

  const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    firstName,
    url,
    subject,
  });

  const mailOptions = {
    from,
    to: user.email,
    subject,
    html,
    text: convert(html),
  };

  await newTransport().sendMail(mailOptions);
};

exports.sendWelcome = (user, url) =>
  sendEmail(user, url, 'welcome', 'Welcome to the Natours Family!');

exports.sendPasswordReset = (user, url) =>
  sendEmail(
    user,
    url,
    'passwordReset',
    'Your password reset token (valid for only 10 minutes)',
  );
