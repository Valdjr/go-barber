import * as yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointment';

class AppointmentController {
    async store(req, res) {
        const schema = yup.object().shape({
            provider_id: yup.number().required(),
            date: yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'validação dos campos falhou' });
        }

        const { provider_id, date } = req.body;

        /**
         * verificar se provider_id é provider
         */
        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });
        if (!isProvider) {
            return res
                .status(400)
                .json({ error: 'provider_id não é um provider' });
        }

        /**
         * verificar se a data já passou
         */
        const hourStart = startOfHour(parseISO(date));
        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'data não permitida' });
        }

        /**
         * verificar se data está disponivel
         */
        const dataNaoDisp = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });
        if (dataNaoDisp) {
            return res.status(400).json({ error: 'data não disponivel' });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
