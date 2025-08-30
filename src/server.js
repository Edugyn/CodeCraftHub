// Carrega variáveis de ambiente antes de qualquer outra coisa
require('dotenv').config();

const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');
const logger = require('./utils/logger');

// Conexão com o MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    logger.info('Conectado ao MongoDB');

    // Inicia o servidor
    app.listen(config.port, () => {
      logger.info(`Servidor rodando na porta ${config.port}`);
      logger.info(`JWT_SECRET carregado: ${process.env.JWT_SECRET ? 'OK' : 'NÃO DEFINIDO'}`);
    });
  })
  .catch((err) => {
    logger.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  });