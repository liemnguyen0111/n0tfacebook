const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class Post extends Model { }

Post.init({
    body: {
    type: DataTypes.STRING(10000),
    allowNull: false
  },
   image: {
    type: DataTypes.STRING ,
    allowNull: true
  }
}, { sequelize, modelName: 'post' })

module.exports = Post
