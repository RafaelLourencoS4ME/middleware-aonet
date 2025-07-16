module.exports = { getData, postData }

const axios = require('axios');

async function getData(url, token, params){
    let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': "application/json"
        },
        params
      };
    return await axios.get(url, config);
  }
  
async function postData(url, token, headers, body = {}){
    let config = {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
          'Content-Type': "application/json"
        }
    };
    return await axios.post(url, body, config);
}