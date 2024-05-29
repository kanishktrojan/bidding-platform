const request = require('supertest');
const server = require('../app');
const { User, Item, Bid, sequelize } = require('../models');

let token;
let itemId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Register and login a user
  await request(server).post('/users/register').send({
    username: 'bidUser',
    password: 'bidPassword',
    email: 'bidUser@example.com',
  });

  const loginResponse = await request(server).post('/users/login').send({
    email: 'bidUser@example.com',
    password: 'bidPassword',
  });

  token = loginResponse.body.token;

  // Create an item
  const itemResponse = await request(server)
    .post('/items')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Bid Item',
      description: 'An item for bidding',
      starting_price: 10.0,
      end_time: '2024-12-31T23:59:59Z',
    });

  itemId = itemResponse.body.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Bid Routes', () => {
  test('It should place a new bid on an item', async () => {
    const response = await request(server)
      .post(`/items/${itemId}/bids`)
      .set('Authorization', `Bearer ${token}`)
      .send({ bid_amount: 20.0 });

    expect(response.statusCode).toBe(201);
    expect(response.body.bid_amount).toBe(20.0);
  });

  test('It should retrieve all bids for an item', async () => {
    const response = await request(server).get(`/items/${itemId}/bids`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
