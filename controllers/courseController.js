const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    // if there is any filter check it
    const categorySlug = req.query.categories; // http://localhost/courses?categories=categorySlug
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug && category) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter)
      .sort('-createdAt')
      .populate('user');
    const categories = await Category.find().sort('name');
    res.status(200).render('courses', {
      page_name: 'courses',
      courses,
      categories: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    res.status(200).render('course-single', { page_name: 'courses', course });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push(req.body.course); // this is not
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
