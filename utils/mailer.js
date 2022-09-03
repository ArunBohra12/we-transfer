// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sendGrid = require('@sendgrid/mail');

const sendMail = mailOptions => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  const mail = {
    to: 'arunbohra33@gmail.com', // Change to your recipient
    from: 'arunbohra12@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sendGrid
    .send(mail)
    .then(() => console.log('Email sent'))
    .catch(error => console.error(error));
};

module.exports = sendMail;
