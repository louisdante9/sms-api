import express from 'express';
import {Messages} from '../../controllers';
import { Message } from '../../models'; //eslint-disable-line
import Serivice from '../../middlewares/service';
import { validateId } from '../../middlewares/validation';

const messages = express();
const messageSerivice = new Serivice();

messages
  .route('/')
  .get(messageSerivice.getAll.bind({ model: Message }))
  .post(Messages.create);

messages
  .route('/:id')
  .all(validateId)
  .get(Messages.retrive)
  .delete(messageSerivice.get.bind({ model: Message, name: 'message' }),
    messageSerivice.delete.bind({ name: 'message' }));

export default messages;