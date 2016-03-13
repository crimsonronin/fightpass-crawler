/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import _ from 'lodash';
import config from '../../config';
import winston from 'winston';

/**
 * A utils service for logging
 *
 * @constructor
 */
class LoggerUtilService {
    constructor() {
        this.logger = new (winston.Logger)();

        // add transports
        _.forEach(config.logger.transports, (transport) => {
            if (!!winston.transports[transport] && !!config.logger[transport]) {
                this.logger.add(winston.transports[transport], config.logger[transport]);
            }
        });
    }

    /**
     * Log an error.
     *
     * @param messages
     */
    error() {
        _.forEach(arguments, (argument) => {
            this.logger.error(config.logger.prefix, argument);
        });
    };

    /**
     * Log a warning.
     *
     * @param messages
     */
    warning() {
        _.forEach(arguments, (argument) => {
            this.logger.warn(config.logger.prefix, argument);
        });
    };

    /**
     * Log an info.
     *
     * @param message
     */
    info() {
        _.forEach(arguments, (argument) => {
            this.logger.info(config.logger.prefix, argument);
        });
    };

    /**
     * Log.
     *
     * @param message
     */
    log() {
        _.forEach(arguments, (argument) => {
            this.logger.log(config.logger.prefix, argument);
        });
    };
}

/**
 * Expose
 * @type {UserValidator}
 */
module.exports = new LoggerUtilService();
