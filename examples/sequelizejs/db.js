const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize-test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
});

module.exports = sequelize;
