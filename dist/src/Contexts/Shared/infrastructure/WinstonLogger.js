import winston from 'winston';
var Levels;
(function (Levels) {
    Levels["DEBUG"] = "debug";
    Levels["ERROR"] = "error";
    Levels["INFO"] = "info";
})(Levels || (Levels = {}));
class WinstonLogger {
    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(winston.format.prettyPrint(), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.colorize(), winston.format.simple()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
                new winston.transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
                new winston.transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
            ]
        });
    }
    debug(message) {
        this.logger.debug(message);
    }
    error(message) {
        this.logger.error(message);
    }
    info(message) {
        this.logger.info(message);
    }
}
export default WinstonLogger;
