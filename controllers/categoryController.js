const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    req.flash('success', 'Category has been created successfully!');
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', 'An Error Occured Please Try Again Later!');
    res.status(400).redirect('/users/dashboard');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    req.flash('success', 'Category has been deleted successfully!');
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', 'An Error Occured Please Try Again Later!');
    res.status(400).redirect('/users/dashboard');
  }
};
