const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.url, {
  dialect: config.dialect
});

const models = {
  User: require('./user')(sequelize, Sequelize),
  Item: require('./item')(sequelize, Sequelize),
  Bid: require('./bid')(sequelize, Sequelize),
  Notification: require('./notification')(sequelize, Sequelize),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
