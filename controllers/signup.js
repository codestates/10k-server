const tokenFunctions = require('./tokenFunctions')
const { users } = require('../DataBase/models')

const signup = async (req, res) => {
    const {name, email, password} = req.body;
    const checkEmail = await users.findOne(
        {where: {email:email}}
    )
    // 이미 가입된 회원인 경우
    if(checkEmail) {
        res.status(409).send({message:'이미 가입된 이메일 주소입니다.'})
    } else { // 가입 안된 경우
        const create = await users.create({
            name: name,
            email: email,
            password: password
        })
        res.status(201).json(create)
    }
}

module.exports = signup