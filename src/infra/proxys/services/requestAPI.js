module.exports = { getData, postData }

const axios = require('axios');

async function getData(url, token, extraHeaders, params){
    let config = {
        headers: {
          ...extraHeaders,
          'Authorization': `Bearer ${token}`,
          'Content-Type': "application/json"
        },
        params
      };
    return await axios.get(url, config);
  }
  
async function postData(url, token, extraHeaders, body = {}){
    let config = {
        headers: {
          ...extraHeaders,
          Authorization: `Bearer ${token}`,
          'Content-Type': "application/json"
        }
    };
    return await axios.post(url, body, config);
}