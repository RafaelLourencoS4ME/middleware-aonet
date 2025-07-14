const winston = require('winston');
const loadEnvironments = require('../infra/configs/loadEnvironmentsConfig')

// Configuração do Winston para logar no console e em arquivo
class Logger {
    static logger = winston.createLogger({
        level: loadEnvironments.logger.level,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} [${level.toUpperCase()}]: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: loadEnvironments.logger.file })
        ]
    });

    static info(message) {
        this.logger.info(message);
    }

    static error(message) {
        this.logger.error(message);
    }

    static warn(message) {
        this.logger.warn(message);
    }
}

// Exporte a classe Logger após a definição
module.exports = { Logger };