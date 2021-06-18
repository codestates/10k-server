const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models')

const saveTime = async (req, res) => {
    // 클라이언트에 goalName 보내달라고 요청하기.
    const { time, goalName } = req.body
    // 클라에서 timesId를 보내줄 경우
    // const { timesId } = req.body

    const data = isAuthorized(req)
    console.log('토큰 해독 데이터:', data); // id, email
    const userId = data.id;

    const goalId = await goals.findOne({where: {name: goalName}});
    // console.log(goalId);

    // 업데이트 전 누적 시간
    const beforeAccTime = await times.findOne({ where : {user_id : userId, goal_id : goalId.dataValues.id}});

    // 업데이트
    await times.update({acc_time : Number(beforeAccTime.dataValues.acc_time) + Number(time)}, { where : {user_id : userId, goal_id : goalId.dataValues.id}})

    // 업데이트 후 누적 시간
    const afterAccTimes = await times.findOne({ where : {user_id : userId, goal_id : goalId.dataValues.id}});

    res.json({"accTime" : afterAccTimes.dataValues.acc_time})
}

module.exports = saveTime