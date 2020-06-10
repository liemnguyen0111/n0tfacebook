const Sequelize = require("sequelize");

 const sequelize = new Sequelize('mysql://cdkdejqc2xjj6qpt:uc8u5ju40npxbcvb@cm4uzjbiregm5ia8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/primary_app_db', 
    {
  dialect:  'mysql'
    });

// const sequelize = new Sequelize(process.env.LOCAL_URL);

module.exports = sequelize;
