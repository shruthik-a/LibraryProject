const express = require('express');
const controller = require('../controllers/manageUserController');
const router = express.Router();

router.delete('/:id', controller.deleteUser);

router.get('/', controller.getUsers);

router.get('/:id', controller.getSingleUser);

router.post('/', controller.insertUser);

router.put('/:id', controller.updateUser);

module.exports = router;