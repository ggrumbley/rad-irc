import Sequelize from 'sequelize';

import config from '../config';

const sequelize = new Sequelize('slack', config.development.username, config.development.password, {
  host: config.development.host,
  port: 5432,
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: 'postgres',
  dialectOptions: {
    ssl: 'Amazon RDS'
  },
  pool: { maxConnections: 5, maxIdleTime: 30},
  language: 'en',
  define: {
    underscored: true,
  },
});

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
