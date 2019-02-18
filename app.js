import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3002
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', router);
// app.get('/', (req, res)=> {
//     res.send('hello there')
// })

app.use('*', (req, res) => res.status(404).json({ message: 'Requested path not configured' }));

app.listen(PORT, () => console.log('app running PORT: ', PORT));

export default app;