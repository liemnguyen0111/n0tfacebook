const Sequelize = require("sequelize");

 const sequelize = new Sequelize(process.env.JAWSDB_MARIA_BLUE_URL, 
    {
  dialect:  'mysql'
    });


module.exports = sequelize;
