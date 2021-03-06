const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const reCaptchaMiddleware = require('../middlewares/reCaptchaMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // http://localhost:5000/
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(reCaptchaMiddleware, pageController.sendEmail); // email
router
  .route('/register')
  .get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);

module.exports = router;
