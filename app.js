const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rotas = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', rotas);

// rota inexistente -> 404 em JSON
app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada.' });
});

// erros gerais (ex: JSON inválido no body) -> sempre em JSON
app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
        erro: status === 400 ? 'JSON inválido na requisição.' : 'Erro interno do servidor.'
    });
});

module.exports = app;