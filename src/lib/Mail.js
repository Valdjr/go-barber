import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
    constructor() {
        const { host, port, secure, auth } = mailConfig;

        this.tranporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        });
    }

    sendMail(menssage) {
        return this.tranporter.sendMail({
            ...mailConfig.default,
            ...menssage,
        });
    }
}

export default new Mail();
