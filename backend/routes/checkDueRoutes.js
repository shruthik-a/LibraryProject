const express = require('express');
const router = express.Router();
const controller = require('../controllers/checkDueController');

router.get('/', controller.getBooksDueForReturn);

router.post('/notify', controller.notifyUser);

module.exports = router;