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
        return middlewareService.ajustarDados(req, res);
    });
    
    app.listen(loadEnvironments.port, () => {
        Logger.info(`Middleware rodando na porta ${loadEnvironments.port}`);
    });
}
