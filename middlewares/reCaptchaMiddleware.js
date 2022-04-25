const request = require('request');

module.exports = (req, res, next) => {
  if (
    req.body['g-recaptcha-response'] === undefined ||
    req.body['g-recaptcha-response'] === '' ||
    req.body['g-recaptcha-response'] === null
  ) {
    return res.json({ responseError: 'captcha error' });
  }
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const verificationURL =
    'https://www.google.com/recaptcha/api/siteverify?secret=' +
    secretKey +
    '&response=' +
    req.body['g-recaptcha-response'] +
    '&remoteip=' +
    req.connection.remoteAddress;

  request(verificationURL, function (error, response, body) {
    body = JSON.parse(body);
    if (body.success !== undefined && !body.success) {
      return res.json({ responseError: 'Failed captcha verification' });
    }
    next();
  });
};
