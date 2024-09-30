module.exports = { getData }

const axios = require('axios');

async function getData(url, token){
    let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': "application/json"
        }
      };

    return await axios.get(url, config);
}