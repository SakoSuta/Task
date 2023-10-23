const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Routes d'authentification
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;