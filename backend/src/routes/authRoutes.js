const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, forgotPassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', require('../controllers/authController').resetPassword);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;
