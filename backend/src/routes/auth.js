const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { registerValidation, loginValidation, csrfProtection } = require('../middleware/validation');

router.post('/register', csrfProtection, registerValidation, register);
router.post('/login', csrfProtection, loginValidation, login);
router.get('/me', authenticate, getProfile);

module.exports = router;