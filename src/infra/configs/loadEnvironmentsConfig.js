require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  tokenUrl: process.env.AUTH_URL_LOGIN,
  authCredentials: {
    client_id: process.env.AUTH_CREDENTIALS_USERNAME,
    client_secret: process.env.AUTH_CREDENTIALS_PASSWORD,
    syndata: process.env.SYNDATA,
    scope: process.env.SCOPE,
    grant_type: process.env.GRANT_TYPE
  },
  logger: {
    level: 'info',
    file: 'logs/middleware.log'
  }
};