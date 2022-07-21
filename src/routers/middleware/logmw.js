import logger from '../../utils/logger.js';
 
const logRequests = (req,res,next) => {
    logger.info(`ruta ${req.originalUrl} - metodo ${req.method}`);
    next();
};

const logError = (err,req,res,next) => {
    logger.error(`[Error] ${err.stack}`);
    next();
};

const logNotFound = (req,res,next) => {
    logger.warn(`La ruta ${req.originalUrl} metodo ${req.method} no implementada`);
    next();
};

export { 
    logRequests,
    logError,
    logNotFound
};