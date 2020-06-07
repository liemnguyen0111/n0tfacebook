const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class Comment extends Model { }

Comment.init({
    title: {
    type: DataTypes.STRING,
    allowNull: false
  },
   image: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  user: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, { sequelize, modelName: 'comment' })

module.exports = Comment
