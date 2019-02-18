import express from 'express';
import {Contacts} from '../../controllers';
import { Contact } from '../../models'; //eslint-disable-line
import Serivice from '../../middlewares/service';
import { validatePhone } from '../../middlewares/validation';

const router = express();
const contactService = new Serivice();

router
  .route('/')
  .get(contactService.getAll.bind({ model: Contact }))
  .post(Contacts.create);

router
  .route('/:id')
  .all(validatePhone, contactService.get.bind({ model: Contact, name: 'contact', key: 'phoneNumber' }))
  .get(Contacts.retrive)
  .put(Contacts.update)
  .delete(contactService.delete.bind({ name: 'contact'}));

export default router;