const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connection");

class Comment extends Model {}

Comment.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "comment" }
);

module.exports = Comment;
