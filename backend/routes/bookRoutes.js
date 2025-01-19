const express = require('express');
const controller = require('../controllers/bookController');
const router = express.Router();

router.delete('/:id', controller.deleteBook);

router.get('/', controller.getBooks);

router.post('/', controller.insertBook);

router.put('/:id', controller.updateBook);

module.exports = router;