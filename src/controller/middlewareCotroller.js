module.exports = { ajustarDados }

const express = require('express');
const bodyParser = require('body-parser');
const middlewareService = require('../services/middlewareService');
const { Logger } = require('../utils/logger');
const loadEnvironments = require('../infra/configs/loadEnvironmentsConfig')
const app = express();

function ajustarDados(){
    app.use(bodyParser.json());

    app.get('/ajustar-dados', async (req, res) => {
        return middlewareService.ajustarDados(req, res, "get");
    });
    
    app.post('/ajustar-dados', async (req, res) => {
        return middlewareService.ajustarDados(req, res, "post");
    });

    app.listen(3000, '0.0.0.0', () => {
        Logger.info('Aplicação rodando na porta 3000');
    });
}