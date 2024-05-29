const request = require('supertest');
const server = require('../app');
const { User, Notification, sequelize } = require('../models');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Register and login a user
  await request(server).post('/users/register').send({
    username: 'notifyUser',
    password: 'notifyPassword',
    email: 'notifyUser@example.com',
  });

  const loginResponse = await request(server).post('/users/login').send({
    email: 'notifyUser@example.com',
    password: 'notifyPassword',
  });

  token = loginResponse.body.token;

  // Create a notification
  await Notification.create({
    user_id: loginResponse.body.user.id,
    message: 'You have a new bid!',
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Notification Routes', () => {
  test('It should retrieve notifications for the logged-in user', async () => {
    const response = await request(server)
      .get('/notifications')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('It should mark notifications as read', async () => {
    const response = await request(server)
      .post('/notifications/mark-read')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Notifications marked as read');
  });
});
