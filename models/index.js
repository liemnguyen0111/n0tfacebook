const User = require("./User.js");
const Post = require("./Post.js");
const Friend = require("./Friend.js");
const FriendReq = require("./FriendReq.js");
const Comment = require("./Comment.js");

User.belongsToMany(User, { as: "friend", through: "myfriend" });
User.belongsToMany(User, {
  as: "Requestees",
  through: "friendrequests",
  foreignKey: "requesterId",
  onDelete: "CASCADE",
});
User.belongsToMany(User, {
  as: "Requesters",
  through: "friendrequests",
  foreignKey: "requesteeId",
  onDelete: "CASCADE",
});

User.hasMany(Post, { foreignKey: { allowNull: false, onDelete: "CASCADE" } });
Post.belongsTo(User);
Post.hasMany(Comment, {
  foreignKey: { allowNull: false, onDelete: "CASCADE" },
});
Comment.belongsTo(Post);

module.exports = { User, Post, Comment, Friend, FriendReq };
