const { isAuthorized } = require('./tokenFunctions')
const { users, times, goals } = require('../DataBase/models')

const changeDesc = () => {
    const { goalName } = req.body

    const data = isAuthorized(req)
    console.log('토큰 해독 데이터:', data); // id, email
    const userId = data.id;

    
}

module.exports = changeDesc