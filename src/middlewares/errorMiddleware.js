/**
 * Middleware para tratamento global de erros
 */
function errorHandler(err, req, res, next) {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message || 'Erro interno do servidor' });
}

module.exports = errorHandler;