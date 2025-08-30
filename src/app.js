const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares globais
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);

// Middleware de tratamento de erros (sempre por último)
app.use(errorHandler);

module.exports = app;
