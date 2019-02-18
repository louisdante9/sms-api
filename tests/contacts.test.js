import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Contact, Message } from '../models';
import { contactSeeds, messageSeeds } from '../seeds';

chai.use(chaiHttp);

const BASE_URL = '/api/v1/contacts';

describe('Contact Controller Test', () => {
  describe('/GET all contacts', () => {
    it('should return an empty array', async () => {
      const res = await chai.request(app).get(`${BASE_URL}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.result.length).to.equal(0);
    });
  });

  describe('/POST', () => {
    it('create a new contact', async () => {
      const res = await chai.request(app)
        .post(`${BASE_URL}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Louis Nwamadi',
          phoneNumber: '09069473974'
        });
      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal('New contact created');
      expect(res.body.contact.name).to.equal('Louis Nwamadi');
      expect(res.body.contact.phoneNumber).to.equal('09069473974');
    });


    it('returns a list of contacts', async () => {
      const res = await chai.request(app).get(`${BASE_URL}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.result.length).to.equal(1);
    });

    it('returns an error due to invalid contact data', async () => {
      const res = await chai.request(app)
        .post(`${BASE_URL}`)
        .set('Accept', 'application/json')
        .send({ phoneNumber: '080342243453' });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid contact data provided');
    });

    it('returns an error due to invalid contact phone number', async () => {
      const res = await chai.request(app)
        .post(`${BASE_URL}`)
        .set('Accept', 'application/json')
        .send({ name: 'mats fish' });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid contact data provided');
    });

    it('returns an error if contact already exist', async () => {
      const res = await chai.request(app)
        .post(`${BASE_URL}`)
        .set('Accept', 'application/json')
        .send({
          name: 'User with taken number',
          phoneNumber: '09069473974'
        });

      expect(res.statusCode).to.equal(409);
      expect(res.body.error).to.equal('Contact with this phone number already exist');
    });
  });

  describe('/GET contact', () => {
    it('return a contact', async () => {
      const res = await chai.request(app).get(`${BASE_URL}/09069473974`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Contact found');
    });

    it('return a 404 error', async () => {
      const res = await chai.request(app).get(`${BASE_URL}/08029190209`);
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('contact not found');
    });

    it('return error for invalid id', async () => {
      const res = await chai.request(app).get(`${BASE_URL}/080291902a`);
      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid Phone Number provided');
    })
  });

  describe('/PUT', () => {
    before(async () => {
      await Contact.bulkCreate(contactSeeds);
    });

    it('update contact detail', async () => {
      const res = await chai.request(app)
        .put(`${BASE_URL}/09069473974`)
        .set('Accept', 'application/json')
        .send({
          name: 'Louis Doe',
          phoneNumber: '09069473974'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body.contact.name).to.equal('Louis Doe');
      expect(res.body.contact.phoneNumber).to.equal('09069473974');
    });

    it('return an error if contact data is invalid', async () => {
      const res = await chai.request(app)
        .put(`${BASE_URL}/09069473974`)
        .set('Accept', 'application/json')
        .send({
          name: 'a',
          phoneNumber: '09092123411'
        });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid contact data provided');
    });

    it('return an error if id is not present in database', async () => {
      const res = await chai.request(app)
        .put(`${BASE_URL}/09069473973`)
        .set('Accept', 'application/json')
        .send({
          name: 'Funsho mathews',
          phoneNumber: '09092127789'
        });
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('contact not found');
    });

    it('return an error if the phoneNumber to update to is already in the database', async () => {
      const res = await chai.request(app)
        .put(`${BASE_URL}/09069473974`)
        .set('Accept', 'application/json')
        .send({
          name: 'Rollingstone Guy',
          phoneNumber: '08080000002'
        });

      expect(res.statusCode).to.equal(500);
    });
  });

  describe('/DELETE', () => {
    before(async () => {
      await Message.bulkCreate(messageSeeds);
    });

    // Happy ending
    it('delete a contact', async () => {
      const res = await chai.request(app).delete(`${BASE_URL}/09069473974`);

      expect(res.statusCode).to.equal(200);
    });


    it('return an error if id not present in db', async () => {
      const res = await chai.request(app).delete(`${BASE_URL}/09069473974`);

      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('contact not found');
    });

    it('return an error if id is invalid', async () => {
      const res = await chai.request(app).delete(`${BASE_URL}/0906947397a`);

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid Phone Number provided');
    })
  })
});