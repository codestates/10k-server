const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models');

const mypage = async (req, res) => {
    // 토큰 해독 검증
    const data = isAuthorized(req)
    console.log('data:', data); // id

    // Times 데이터 조회
    const timesData = await times.findAll({where: {user_id: data.id}})

    // Times 데이터가 없는 경우
    if(!timesData) {
        res.send({userinfo : data, goalsList : [] });
    }
    // TImes 데이터가 있는 경우
    // 데이터 전송 : name, email, goal, acc time, total time
    const name = await users.findOne({where : {id : data.id}})
    // name : name.dataValues.name, email : name.dataValues.email, 

    for(let i = 0; i < timesData.length; i++) {
        console.log(`타임즈 데이터 ${i}번:`, timesData[i].dataValues)
        const goalName = await goals.findOne({where : {id : timesData[i].dataValues.id}})
        timesData[i].dataValues.goalName = goalName.name;
    }

    res.json({
            name : name.dataValues.name, 
            email : name.dataValues.email,
            timesData
        }
    );
}

module.exports = mypage