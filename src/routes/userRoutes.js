const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { registerSchema, loginSchema } = require('../utils/validators');

// Rota para registro
router.post('/register', validateRequest(registerSchema), userController.registerUser);

// Rota para login
router.post('/login', validateRequest(loginSchema), userController.loginUser);

// Rota protegida de exemplo para perfil do usuário
router.get('/profile', authenticateToken, async (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
});

module.exports = router;