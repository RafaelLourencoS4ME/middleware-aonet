module.exports = { verificarETentarObterNovoToken, obterNovoToken }

const axios = require('axios');
const { Logger } = require('../../../utils/logger');
const loadEnvironments = require('../../configs/loadEnvironmentsConfig')

// Função para obter um novo token
async function obterNovoToken() {
  try {
    Logger.info('Solicitando novo token...');
    const resposta = await axios.post(loadEnvironments.tokenUrl, loadEnvironments.authCredentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    Logger.info('Novo token obtido com sucesso:', resposta.data.token);
    return resposta.data.token;
  } catch (error) {
    Logger.error('Erro ao obter novo token: ' + (error.response ? error.response.data : error.message));
    throw new Error('Não foi possível obter um novo token.');
  }
}

// Verificação de Token Expirado ou Inválido
async function verificarETentarObterNovoToken(error) {
  if (error.response && error.response.status === 401) {
    Logger.warn('Token expirado ou inválido. Tentando obter um novo token...');
    return await obterNovoToken();
  } else {
    throw error; // Re-lança o erro se não for relacionado ao token
  }
}