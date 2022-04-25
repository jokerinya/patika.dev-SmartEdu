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
    req.flash(
      'success',
      `Course: '${course.name}' has been created successfully!`
    );
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash('error', 'Some error occured, please try again later.');
    res.status(400).redirect('/courses');
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    // if there is any filter check it
    const categorySlug = req.query.categories; // http://localhost/courses?categories=categorySlug

    // Seach paramaters in the request
    const query = req.query.search; // http://localhost/courses?search=query

    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug && category) {
      filter = { category: category._id };
    }

    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      filter.name = '';
      filter.categories = null;
    }
    const courses = await Course.find({
      $or: [
        // case insensetive search for entered name
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
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
    const user = await User.findById(req.session.userID);
    const categories = await Category.find().sort('name');
    res.status(200).render('course-single', {
      page_name: 'courses',
      course,
      user,
      categories,
    });
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
    await user.courses.push({ _id: req.body.course }); // mongoose helper
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.releseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course }); // mongoose helper
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
