const express = require('express');
const router = express.Router();
const controller = require('../controllers/activationRequestController');

router.get('/', controller.getRequests);

router.put('/allow', controller.allowAccess);

module.exports = router;