const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

router.get('/:id', controller.getUserDetails);

router.get('/', controller.fetchBooks);

router.get('/bookCount/:id', controller.getMaximumBookCount);

router.get('/getBorrowedBooks/:id', controller.getBorrowedBooks);

router.post('/addTransaction', controller.addTransaction);

router.delete('/:userId/book/:bookId', controller.removeBook);

router.get('/:userId/fines', controller.getFines);

router.get('/notifications/:userID', controller.getUserNotifications);

router.delete('/:notificationID', controller.deleteNotification);

router.put('/:updateFineStatus', controller.updateFineStatus);

module.exports = router;