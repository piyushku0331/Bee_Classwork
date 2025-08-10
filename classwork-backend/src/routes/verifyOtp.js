const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// OTP verification route
router.post('/', userController.verifyOtp);

module.exports = router;
