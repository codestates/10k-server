const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models')

const removeGoal = async (req, res) => {
    const { goalName } = req.body

    const data = isAuthorized(req);
    console.log('토큰 해독 데이터:', data); // id, email
    const userId = data.id;
    const goalId = await goals.findOne({where: {name: goalName}})

    console.log('userId:', userId)
    console.log('goalId:', goalId)

    times.destroy({where : {user_id: userId, goal_id: goalId.dataValues.id }})

    res.send("목표가 삭제되었습니다.")
}

module.exports = removeGoal