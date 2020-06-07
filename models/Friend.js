const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class Friend extends Model { }

Friend.init({
 
}, { sequelize, modelName: 'myfriend' })

module.exports = Friend
