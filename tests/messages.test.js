import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Message } from '../models';
import app from '../app';

chai.use(chaiHttp);

const BASE_URL = '/api/v1/messages';

describe('/Message Controller Test', () => {
  before(async () => {
    await Message.destroy({ where: {} });
  });

  describe('/GET all messages', () => {
    it('return an empty array', async () => {
      const res = await chai.request(app).get(BASE_URL);
      expect(res.statusCode).to.equal(200);
      expect(res.body.result.length).to.equal(0);
    });
  });

  describe('/POST', () => {
    it('create a new Message', async () => {
      const res = await chai.request(app)
        .post(BASE_URL)
        .set('Accept', 'application/json')
        .send({
          content: 'A sample message',
          senderId: '08080000000',
          receiverId: '08080000002',
        });

      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal('Message sent');
      expect(res.body.data.status).to.equal('sent');
    });

    it('return error if body data is not valid', async () => {
      const res = await chai.request(app)
        .post(BASE_URL)
        .set('Accept', 'application/json')
        .send({
          content: '',
          senderId: '08080000000',
          receiverId: '08080000002',
        });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid Message Data provided');
    });

    it("return an array of messages with status 'sent'", async () => {
        const res = await chai.request(app).get(BASE_URL);
        expect(res.statusCode).to.equal(200);
        expect(res.body.result.length).to.equal(1);
        expect(res.body.result[0].status).to.equal('sent');
      });

    it('return error if senderId is not in db', async () => {
      const res = await chai.request(app)
        .post(BASE_URL)
        .set('Accept', 'application/json')
        .send({
          content: 'A message from invalid contact',
          senderId: '08080000009',
          receiverId: '08080000002',
        });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Sender or receiver not available/valid');
    });

    it('return error if receiverId is not in db', async () => {
      const res = await chai.request(app)
        .post(BASE_URL)
        .set('Accept', 'application/json')
        .send({
          content: 'A message from invalid contact',
          receiverId: '08080000009',
          senderId: '08080000002',
        });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Sender or receiver not available/valid');
    });

    it('return error if receiverId/senderId are the same', async () => {
      const res = await chai.request(app)
        .post(BASE_URL)
        .set('Accept', 'application/json')
        .send({
          content: 'A message from invalid contact',
          receiverId: '08080000002',
          senderId: '08080000002',
        });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Sender or receiver not available/valid');
    });
  });

  describe('/GET', () => {
    it('return a message with read status', async () => {
      const res = await chai.request(app).get(`${BASE_URL}/4`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Message found');
      expect(res.body.data.status).to.equal('read');
      expect(res.body.data.sentAt).to.exist;
    });

    it('return error for invalid Message Id', async () => {
      const res = await chai.request(app).get(`${BASE_URL}/s`);
      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid Message Id provided');
    });

    it('return error if message not present', async () => {
      const res = await chai.request(app).get(`${BASE_URL}/5`);
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('Message not found');
    });
  });
});