import express from 'express';
import contacts from './contacts';
import messages from './messages';

const routes = express();

routes.use('/contacts', contacts);
routes.use('/messages', messages);

export default routes;