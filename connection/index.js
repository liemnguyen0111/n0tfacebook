const Sequelize = require('sequelize')

// let sequelize


     const sequelize = new Sequelize("mysql://jppqn91gv0lrph8u:xleq3bqq4v4q9xbx@sq65ur5a5bj7flas.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ml281dqbclp0zm1n", {
      dialect:  'postgres',
      protocol: 'postgres',
      logging:  true //false
    });

// const sequelize = new Sequelize( process.env.JAWSDB_URL || process.env.LOCAL_URL )

module.exports = sequelize