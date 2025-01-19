const express = require('express');
const router = express.Router();
const controller = require('../controllers/fineController');

router.get('/', controller.getFines);

router.post('/notify', controller.notifyUser);

module.exports = router;