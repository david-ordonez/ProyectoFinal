import log4js from 'log4js';

log4js.configure({
    appenders: {
        console: { type: 'console' },
        archivoErrores: { type: 'file', filename: 'errores.log ' },
        archivoWarn: { type: 'file', filename: 'warn.log ' },
        loggerConsola: { type: 'logLevelFilter', appender: 'console', level: 'info' },
        loggerArchivoErrores: { type: 'logLevelFilter', appender: 'archivoErrores', level: 'error' },
        loggerArchivoWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn' },
    },
    categories: {
        default: {
            appenders: ['loggerConsola', 'loggerArchivoErrores', 'loggerArchivoWarn'], level: 'all'
        }
    }
});

const logger = log4js.getLogger('default');

export default logger;