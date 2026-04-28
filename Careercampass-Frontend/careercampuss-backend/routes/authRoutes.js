const express = require('express');
const { register, login, logout, getMe, forgotPassword, resetPassword, updateProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { loginLimiter } = require('../middlewares/securityMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/profile', protect, updateProfile);

module.exports = router;
