const express = require('express');
const { register, login, profile, requestPasswordReset, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
