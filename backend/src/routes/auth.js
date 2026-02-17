const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/validation');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', authenticate, getProfile);

module.exports = router;