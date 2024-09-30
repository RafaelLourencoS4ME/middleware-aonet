module.exports = { ajustarDados }

const concatenarUtil = require('../utils/concatenarDados')
const authAPI = require('../infra/proxy/services/authAPI')
const requestAPI = require('../infra/proxy/services/requestAPI')
const { Logger } = require('../utils/logger');

let token = "aa.bb.cc";

async function ajustarDados(req, res) {
  try {
    const url = req.query.host;
    let respostaAPI;
    let dto;

    try {
      Logger.info(`Fazendo requisição para URL: ${url}`);
      respostaAPI = await requestAPI.getData(url, token)
      Logger.info('Resposta da API recebida com sucesso.');
    } catch (error) {
      Logger.error('Erro na primeira tentativa de chamada à API: ' + (error.response ? error.response.data : error.message));
      token = await authAPI.verificarETentarObterNovoToken(error);
      Logger.info('Tentando novamente a requisição com o novo token...');
      respostaAPI = requestAPI.getData(url, token);
      Logger.info('Resposta da API recebida com sucesso após a atualização do token.');
    }

    if (!respostaAPI.data || !Array.isArray(respostaAPI.data) || respostaAPI.data.length === 0) {
      Logger.warn('Nenhum dado encontrado.');
      return res.status(404).json({ erro: 'Nenhum dado encontrado.' });
    }

    if (respostaAPI.data.length > 0) {
      dto = concatenarUtil.dadosAninhados(respostaAPI.data);
    }

    return res.json(dto);

  } catch (error) {
    Logger.error('Erro ao buscar e ajustar dados: ' + error.message);
    return res.status(500).json({ erro: 'Erro ao buscar e ajustar dados.' });
  }
}