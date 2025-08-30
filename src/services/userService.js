const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

/**
 * Cria um novo usuário com hash de senha
 * @param {Object} userData - Dados do usuário (username, email, password)
 * @returns {Promise<User>}
 */
async function createUser(userData) {
  const { username, email, password } = userData;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ username, email, passwordHash });
  await user.save();
  return user;
}

/**
 * Busca usuário por email
 * @param {string} email
 * @returns {Promise<User|null>}
 */
async function findUserByEmail(email) {
  return User.findOne({ email });
}

module.exports = {
  createUser,
  findUserByEmail
};