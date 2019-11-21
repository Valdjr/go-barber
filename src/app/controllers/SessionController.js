import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = yup.object().shape({
            email: yup
                .string()
                .email()
                .required(),
            password: yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Campos inválidos' });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'usuario não econtrado' });
        }
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'senha inválida' });
        }
        const { id, name } = user;
        return res.json({
            user: { id, name, email },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expiresIn,
            }),
        });
    }
}

export default new SessionController();
