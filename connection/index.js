const Sequelize = require('sequelize')

// let sequelize


     const sequelize = new Sequelize("mysql://hgwh4fkqqsobj5lu:blw7gk4jecx1x7b5@qf5dic2wzyjf1x5x.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/v48dqogftndvzg8r", {
      dialect:  'postgres',
      protocol: 'postgres',
      logging:  true //false
    });

// const sequelize = new Sequelize( process.env.JAWSDB_URL || process.env.LOCAL_URL )

module.exports = sequelize