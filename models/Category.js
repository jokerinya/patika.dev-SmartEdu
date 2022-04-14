const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

// before saving to db, we will use a middleware
// here should not be used arrow function bcs of 'this'
CategorySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
