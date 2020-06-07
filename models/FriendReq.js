const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class FriendReq extends Model { }

FriendReq.init({
 
}, { sequelize, modelName: 'friendrequests' })

module.exports = FriendReq
