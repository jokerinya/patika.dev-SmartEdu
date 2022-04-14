const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // http://localhost:5000/
router.route('/about').get(pageController.getIndexPage);
router.route('/register').get(pageController.getRegisterPage);

module.exports = router;
