const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // referance is the name of other model
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // referance is the name of other model
  },
});

// before saving to db, we will use a middleware
// here should not be used arrow function bcs of 'this'
CourseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
