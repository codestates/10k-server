const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models')

const addGoal = async (req, res) => {
    // console.log('요청 바디:', req.body);
    const { goalName, description, totalTime, accTime  } = req.body

    const data = isAuthorized(req)
    console.log('토큰 해독 데이터:', data); // id, email
    const userId = data.id;

    let checkGoalsTable = await goals.findOne({where : {name : goalName}});
    // goals 테이블에 없는 경우

    if(!checkGoalsTable) {
        await goals.create({name: goalName})
        // checkGoalsTable이 현재 null이므로 재할당
        checkGoalsTable = await goals.findOne({where : {name : goalName}});
    }
    
    const goalId = await checkGoalsTable.dataValues.id;
    const checkTimesTable = await times.findOne({where : {goal_id : goalId, user_id: userId}})

    // 중복된 goal 차단
    if(!checkTimesTable) {
        await times.create({ 
            user_id : userId, 
            goal_id : goalId, 
            total_time : totalTime, 
            acc_time : accTime, 
            description : description
        })
    } else {
        res.status(409).json('이미 등록된 목표 입니다.')
    }

    // 굳이 데이터를 보낼 필요가 있을까?
    res.json({
        goalName: goalName,
        accTime: accTime,
        totalTime: totalTime,
        description: description
    })
}

module.exports = addGoal