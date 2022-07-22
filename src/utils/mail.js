import { createTransport } from "nodemailer";
import config from '../config.js'
import logger from './logger.js'

const transporter = createTransport({
    service: config.mailService,
    port: config.mailPort,
    auth: {
        user: config.mailHost,
        pass: config.mailClave
    }
});

export function sendMail(emailTo){
    try {
        config.mailOptions.to = emailTo
        return await transporter.sendMail(config.mailOptions);
    } catch (error) {
        logger.error(`Error enviando correo ${error}`)
        throw new Error(error);
    }
}

