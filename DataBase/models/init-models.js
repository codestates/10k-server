var DataTypes = require("sequelize").DataTypes;
var _goals = require("./goals");
var _times = require("./times");
var _users = require("./users");

function initModels(sequelize) {
  var goals = _goals(sequelize, DataTypes);
  var times = _times(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  times.belongsTo(goals, { as: "goal", foreignKey: "goal_id"});
  goals.hasMany(times, { as: "times", foreignKey: "goal_id"});
  times.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(times, { as: "times", foreignKey: "user_id"});

  return {
    goals,
    times,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
