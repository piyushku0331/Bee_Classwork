const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;
