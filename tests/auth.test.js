const request = require('supertest');
const server = require('../app');
const { User, sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Routes', () => {
  test('It should register a new user', async () => {
    const response = await request(server).post('/users/register').send({
      username: 'testuser',
      password: 'testpassword',
      email: 'testuser@example.com'
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe('testuser');
  });

  test('It should login a user', async () => {
    await User.create({ username: 'loginuser', password: 'loginpassword', email: 'loginuser@example.com' });
    const response = await request(server).post('/users/login').send({
      email: 'loginuser@example.com',
      password: 'loginpassword'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
