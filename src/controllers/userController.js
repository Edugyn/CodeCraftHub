const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Handler para registro de usuário
 */
async function registerUser(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    const user = await userService.createUser({ username, email, password });

    // Criar token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    next(error);
  }
}

/**
 * Handler para login do usuário
 */
async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  loginUser
};