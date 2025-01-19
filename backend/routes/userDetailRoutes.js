//checked
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userDetailController');

router.get('/borrowedBooks/:userId', controller.getBorrowedBooks);

router.get('/fines/:userId', controller.getFines);

module.exports = router;