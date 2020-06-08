const Sequelize = require('sequelize')


     const sequelize = new Sequelize(process.env.JAWSDB_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      logging:  true //false
    });

// const sequelize = new Sequelize( 'mysql://root:Summer09!2MSQL@localhost:3306/notfacebook_db' )

module.exports = sequelize