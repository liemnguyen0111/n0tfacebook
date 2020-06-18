const Sequelize = require("sequelize");

 const sequelize = new Sequelize(JAWSDB_MARIA_BLUE_URL, 
    {
  dialect:  'mysql'
    });

// const sequelize = new Sequelize(process.env.LOCAL_URL);

module.exports = sequelize;
