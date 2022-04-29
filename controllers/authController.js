const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (err) {
    const errors = validationResult(req);
    console.log(errors.array()[0].msg);

    for (const error of errors.array()) {
      req.flash('error', `${error.msg}`);
    }

    res.status(400).redirect('/register');
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // if user exists and if not callback function
    const user = await User.findOne({ email });
    if (user) {
      // user found
      bcrypt.compare(password, user.password, (err, same) => {
        // password is correct
        if (same) {
          // USER SESSION
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          // wrong password
          req.flash('error', 'Your password is not correct!');
          res.status(400).redirect('/login');
        }
      });
    } else {
      // there is not a user with email
      req.flash('error', 'User has not been found!');
      res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID).populate('courses');
    const categories = await Category.find();
    const courses = await Course.find({ user }); // Teacher uses this.
    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      courses,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
