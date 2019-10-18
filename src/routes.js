import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Valdir',
        email: 'valdir@gmail.com',
        password_hash: 'dasdwdwa',
    });
    return res.json(user);
});

export default routes;
