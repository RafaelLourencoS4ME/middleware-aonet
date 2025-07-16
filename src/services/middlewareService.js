// middlewareService.js

module.exports = { ajustarDados };

const concatenarUtil = require('../utils/concatenarDados');
const authAPI = require('../infra/proxys/services/authAPI');
const requestAPI = require('../infra/proxys/services/requestAPI');
const { Logger } = require('../utils/logger');

async function ajustarDados(req, res, verb) {
  try {
    const {host: url, ...params} = req.query;
    const body = req.body;
    const extraHeaders = req.headers["authorization-token"]? {"Authorization-Token": req.headers["authorization-token"]} : {};
    let respostaAPI;
    let dto;

    // Obtém o token válido antes da requisição
    let token = await authAPI.obterTokenValido();

    try {
      Logger.info(`Fazendo requisição ${verb} para URL: ${url}`);
      if(verb == "get"){
        respostaAPI = await requestAPI.getData(url, token, params);
      } else {
        respostaAPI = await requestAPI.postData(url, token, extraHeaders, body);
      }
      Logger.info('Resposta da API recebida com sucesso.');
    } catch (error) {
      Logger.error('Erro na chamada à API: ' + (error.response ? error.response.data : error.message));

      // Se a API retornar 401, significa que o token, apesar de ainda
      // não estar “formalmente” expirado, não é mais válido para a API
      if (error.response && error.response.status === 401) {
        Logger.warn('Token possivelmente expirado ou inválido. Tentando obter um novo token...');

        // Solicita um novo token
        token = await authAPI.obterNovoToken();

        // Tenta chamar a API novamente usando o novo token
        try {
          respostaAPI = await requestAPI.getData(url, token);
          Logger.info('Resposta da API recebida com sucesso após renovação do token.');
        } catch (errorAgain) {
          Logger.error('Erro na chamada à API após renovação do token: '
            + (errorAgain.response ? errorAgain.response.data : errorAgain.message));
          throw errorAgain;
        }
      } else {
        // Se não for 401, relança o erro
        throw error;
      }
    }

    if (!respostaAPI.data || Object.keys(respostaAPI.data).length === 0) {
      Logger.warn('Nenhum dado encontrado.');
      return res.status(404).json({ erro: 'Nenhum dado encontrado.' });
    }

    // Processa os dados recebidos
    if(Array.isArray(respostaAPI.data)){
      Logger.warn('Dados começam com array.');
      dto = concatenarUtil.dadosAninhados(respostaAPI.data);
    }else{
      Logger.warn('Dados começam com objeto.');
      dto = concatenarUtil.dadosAninhadosObject(respostaAPI.data);
    }
    
    return res.json(dto);
  } catch (error) {
    Logger.error('Erro ao buscar e ajustar dados: ' + error.message);
    return res.status(500).json({ erro: 'Erro ao buscar e ajustar dados.' });
  }
}