const express = require('express');
const controller = require('../controllers/returnEntryController');
const router = express.Router();

router.get('/', controller.getNotReturnedBooks);

router.put('/update', controller.updateReturnStatus);

router.put('/damage', controller.updateDamageStatus);

module.exports = router;