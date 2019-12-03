const path = require('path');
const request = require('supertest');

const app = require(path.resolve('app/app'));

const dotenv = require('dotenv');
dotenv.config({ path: '.env.development' });

describe('Object api test', () => {
  it('should create new object', async () => {
    const res = await request(app)
      .post('/object')
      .send({
        "test_key": "test_value"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('key');
    expect(res.body).toHaveProperty('value');
  });

  it('should get single object', async () => {
    const res = await request(app)
      .get('/object/test_key');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('value');
  });
});
