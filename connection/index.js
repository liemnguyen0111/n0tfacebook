const Sequelize = require("sequelize");

 const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  dialect:  'postgres',
  protocol: 'postgres',
  logging:  true //false
});

// const sequelize = new Sequelize(process.env.LOCAL_URL);

module.exports = sequelize;
