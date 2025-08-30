const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');
const logger = require('./utils/logger');

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Conectado ao MongoDB');
    app.listen(config.port, () => {
      logger.info(`Servidor rodando na porta ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  });