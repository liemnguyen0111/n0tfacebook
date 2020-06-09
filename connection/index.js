const Sequelize = require("sequelize");

 const sequelize = new Sequelize(process.env.JAWSDBM_URL, 
    {
  dialect:  'mysql'
    });

// const sequelize = new Sequelize(process.env.LOCAL_URL);

module.exports = sequelize;
