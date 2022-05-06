const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(categoryController.createCategory); // http://localhost:3000/categories
router.route('/:id').delete(authMiddleware, categoryController.deleteCategory); // http://localhost:3000/categories

module.exports = router;
