const Sequelize = require("sequelize");


 const sequelize = new Sequelize(process.env.JAWSDB_MARIA_BLUE_URL || "mysql://sg2zqgafsmi5yhhm:nnbou8wslifh9uyj@un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/t65bzvfr46dx4dat", 
    {
  dialect:  'mysql'
    });


module.exports = sequelize;
