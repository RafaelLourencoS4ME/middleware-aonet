module.exports = { verificarETentarObterNovoToken, obterNovoToken, obterTokenValido };

const axios = require('axios');
const { Logger } = require('../../../utils/logger');
const loadEnvironments = require('../../configs/loadEnvironmentsConfig');

// Cache para armazenar o token e seu tempo de expiração
let tokenCache = {
  token: null,
  expiration: null,
};

// Função para obter um novo token
async function obterNovoToken() {
  try {
    Logger.info('Solicitando novo token...');
    const resposta = await axios.post(loadEnvironments.tokenUrl, loadEnvironments.authCredentials, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const novoToken = resposta.data.access_token;
    const expirationTime = Date.now() + resposta.data.expires_in * 1000;

    tokenCache.token = novoToken;
    tokenCache.expiration = expirationTime;

    Logger.info('Novo token obtido com sucesso:' + novoToken);
    return novoToken;
  } catch (error) {
    Logger.error('Erro ao obter novo token: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
    throw new Error('Não foi possível obter um novo token.');
  }
}

// Função para verificar e retornar um token válido
async function obterTokenValido() {
  if (!tokenCache.token || Date.now() >= tokenCache.expiration) {
    Logger.info('Token ausente ou expirado. Obtendo um novo token...');
    return await obterNovoToken();
  }

  Logger.info('Token válido encontrado no cache.');
  return tokenCache.token;
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