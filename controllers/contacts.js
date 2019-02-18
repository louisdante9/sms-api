import { Contact } from '../models'; //eslint-disable-line
import { response } from '../middlewares/validation';
import { validateContact } from '../middlewares/validation';

export default class Contacts {
    static async create({ body }, res) {
        const validInfo = validateContact(body);

        if (!validInfo) {
            return response(res, 422, { error: 'Invalid contact data provided' });
        }

        try {
            const { name, phoneNumber } = validInfo;
            const [contact, created] = await Contact
                .findOrCreate({
                    where: {
                        phoneNumber,
                    },
                    defaults: { name },
                });
            return response(res, created ? 201 : 409,
                created ? { message: 'New contact created', contact }
                    : { error: 'Contact with this phone number already exist' });
        } catch (error) {
            return response(res, 500, { error });
        }
    }

    static async retrive({ contact }, res) {
        return response(res, 200, { message: 'Contact found', data: contact });
    }

    static async update({ contact, body, params }, res) {
        const validInfo = validateContact(body, contact);

        if (!validInfo) {
            return response(res, 422, { error: 'Invalid contact data provided' });
        }

        const { name, phoneNumber } = validInfo;
        const { id } = params;

        try {
            const [, [contact]] = await Contact
                .update({ phoneNumber, name }, {
                    where: {
                        phoneNumber: id,
                    },
                    returning: true,
                });
               const result =  await  response(res, 200, { message: 'Contact updated', contact });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                const err = {
                    message:  'phone is already in use'
                }
                return res.status(500).json(err)
            }
            return response(res, 500, { error });
        }
    }
}