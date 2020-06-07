const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class User extends Model { }

User.init({
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
   username: {
    type: DataTypes.STRING,
    allowNull: false
  },
   password: {
    type: DataTypes.STRING,
    allowNull: false
  },
   firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
   type: DataTypes.STRING,
   allowNull: false
 },
 age: {
  type: DataTypes.INTEGER,
  allowNull: false
},
email: {
 type: DataTypes.STRING,
 allowNull: false
},
gender: {
 type: DataTypes.STRING,
 allowNull: false
},
activated: {
 type: DataTypes.BOOLEAN,
 allowNull: false
}
}, { sequelize, modelName: 'user'})

module.exports = User
