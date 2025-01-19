const express = require('express');
const controller = require('../controllers/adminDashboardController');
const router = express.Router();

router.get('/totalBooks', controller.getTotalBooks);

router.get('/totalUsers', controller.getTotalUsers);

router.get('/booksDue', controller.getBooksDue);

router.get('/notReturnedBooks', controller.getNotReturnedBooks);

module.exports = router;