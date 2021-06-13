const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models');

const goalPage = async (req, res) => {
    const data = isAuthorized(req);
    const userId = data.id;
    const { userName, goalName } = req.body;
    // const { timesId } = res.body;

    const goalId = await goals.findOne({where: {name: goalName}});
    const timesId = await times.findOne({ where : {user_id : userId, goal_id : goalId.dataValues.id}})

    res.json({
        userName: userName,
        goalName: goalName,
        accTime: timesId.dataValues.acc_time,
        totalTime: timesId.dataValues.total_time,
        description: timesId.dataValues.description
    });
}

module.exports = goalPage