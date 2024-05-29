const request = require('supertest');
const server = require('../app');
const { User, Item, sequelize } = require('../models');

let token;
let itemId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Register and login a user
  await request(server).post('/users/register').send({
    username: 'itemUser',
    password: 'itemPassword',
    email: 'itemUser@example.com',
  });

  const loginResponse = await request(server).post('/users/login').send({
    email: 'itemUser@example.com',
    password: 'itemPassword',
  });

  token = loginResponse.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Item Routes', () => {
  test('It should create a new item', async () => {
    const response = await request(server)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Item',
        description: 'A test item',
        starting_price: 10.0,
        end_time: '2024-12-31T23:59:59Z',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Test Item');
    itemId = response.body.id;
  });

  test('It should retrieve all items', async () => {
    const response = await request(server).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('It should retrieve a single item by ID', async () => {
    const response = await request(server).get(`/items/${itemId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Test Item');
  });

  test('It should update an item by ID', async () => {
    const response = await request(server)
      .put(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Test Item' });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated Test Item');
  });

  test('It should delete an item by ID', async () => {
    const response = await request(server)
      .delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
