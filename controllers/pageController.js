const nodemailer = require('nodemailer');

exports.getIndexPage = async (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = async (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = async (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = async (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = async (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  const outputMessage = /*html*/ `
    <h1>Mail Details</h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GOOGLE_ACCOUNT, // gmail account
      pass: process.env.GOOGLE_PASSWORD, // gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Smart Edu Contact Form 👻 <${process.env.GOOGLE_ACCOUNT}>`, // sender address
    to: req.body.email, // list of receivers
    subject: 'Hello ✔', // Subject line
    html: outputMessage, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  res.status(202).redirect('/contact');
};
