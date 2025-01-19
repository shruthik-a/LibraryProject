const express = require('express');
const controller = require('../controllers/categoryController');
const router = express.Router();

router.delete('/:id', controller.deleteCategory);

router.get('/', controller.getCategories);

module.exports = router;