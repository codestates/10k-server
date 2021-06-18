const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models')

const removeGoal = async (req, res) => {
    const { goalName } = req.body
    console.log('요청 바디@@@@:',req.body)
    console.log('요청 헤더@@@@:',req.headers)
    
    // 클라이언트 timesId를 보내줄 경우
    // const { timesId } = req.body

    const data = isAuthorized(req);
    console.log('토큰 해독 데이터:', data); // id, email
    const userId = data.id;
    const goalId = await goals.findOne({where: {name: goalName}})

    console.log('userId:', userId)
    console.log('goalId:', goalId)

    times.destroy({where : {user_id: userId, goal_id: goalId.dataValues.id }})
    // 클라이언트 timesId를 보내줄 경우
    // times.destroy({where : {id : timesId }})

    res.send("목표가 삭제되었습니다.")
}

module.exports = removeGoal