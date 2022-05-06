const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please enter your name'),
    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email.')
      .custom(async (userEmail) => {
        const user = await User.findOne({ email: userEmail });
        // library waits for a promise reject. returns null if user has not been found
        return user && Promise.reject('Email is already exists!');
      }),
    body('password').not().isEmpty().withMessage('Please enter your password'),
  ],
  authController.createUser
); //http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/:id').delete(authMiddleware, authController.deleteUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //http://localhost:3000/users/dashboard

module.exports = router;
