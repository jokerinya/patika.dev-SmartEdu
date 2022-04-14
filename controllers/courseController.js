const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
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

    const courses = await Course.find(filter);
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
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render('course-single', { page_name: 'courses', course });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
