const express = require('express');
const controller = require('../controllers/loginController');
const router = express.Router();

router.post('/adminLogin', controller.adminLogin);

router.post('/registerUser', controller.registerUser);

router.post('/loginUser', controller.loginUser);

router.get('/checkUser', controller.checkUserExist);

router.post('/requestActivation', controller.requestActivation);

router.put('/pay', controller.newInstall);

module.exports = router;