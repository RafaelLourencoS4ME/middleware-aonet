require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  tokenUrl: process.env.AUTH_URL_LOGIN,
  authCredentials: {
    username: process.env.AUTH_CREDENTIALS_USERNAME,
    password: process.env.AUTH_CREDENTIALS_PASSWORD
  },
  logger: {
    level: 'info',
    file: 'logs/middleware.log'
  }
};