const tokenFunctions = require('./tokenFunctions')
const { users } = require('../DataBase/models')


const withdrawal = async (req,res) => {
  const verity = tokenFunctions.isAuthorized(req)  //토큰 해독
  
  if(!verity){ //토큰 해독불가능
    res.status(404).send('잘못된 접근')
  }else{
    await users.destroy({where: {email:verity.email}})
    res.status(200).send('회원탈퇴 되었습니다')
  }

  
}

module.exports = withdrawal