import { Op } from 'sequelize';
import { Message, Contact } from '../models'; //eslint-disable-line
import { response } from '../middlewares/validation';
import { validateMessage } from '../middlewares/validation';

export default class Messages {
  static async create({ body }, res) {
    const validInfo = validateMessage(body);

    if (!validInfo) {
      return response(res, 422, { error: 'Invalid Message Data provided' });
    }

    try {
      const { content, senderId, receiverId } = validInfo;

      const contacts = await Contact.findAll({
        where: {
          [Op.or]: [
            { phoneNumber: senderId },
            { phoneNumber: receiverId },
          ],
        },
      });

      if (contacts.length === 0) {
        return response(res, 422, { error: 'Sender and receiver are not available' });
      } if (contacts.length < 2) {
        return response(res, 422, { error: 'Sender or receiver not available/valid' });
      }

      const data = await Message.create({ content, senderId, receiverId });

      return response(res, 201, { message: 'Message sent', data });
    } catch (error) {
      return response(res, 500, { error });
    }
  }

  static async retrive(req, res) {
    const { id } = req;

    try {
      const data = await Message.findOne({
        where: { id },
        attributes: {
          exclude: ['senderId', 'receiverId'],
        },
        include: [
          { model: Contact, as: 'sender', attributes: ['name', 'phoneNumber'] },
          { model: Contact, as: 'receiver', attributes: ['name', 'phoneNumber'] },
        ],
      });

      if (!data) {
        return response(res, 404, { error: 'Message not found' });
      }

      const updated = await data.update({
        status: 'read',
      });

      return response(res, 200, { message: 'Message found', data: updated });
    } catch (error) {
      return response(res, 500, { error });
    }
  }
}