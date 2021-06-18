const tokenFunctions = require('./tokenFunctions')
const { users ,times, goals} = require('../DataBase/models')

const withdrawal = async (req,res) => {
  const verity = tokenFunctions.isAuthorized(req)

  
  if(!verity){ //토큰 해독불가능
    // 유효기간 지난 토큰. or 해독 안되는 잘못된 토큰
    res.status(404).send('잘못된 접근')
  }else{
    await users.findOne({where:{email:verity.email}})
    .then(res => {console.log(res)
      times.destroy({where:{user_id:res.id}})} )
      
    await users.destroy({where:{email:verity.email}})

    res.cookie('login',false)
    res.cookie('accessToken',null)
    res.status(200).send('회원탈퇴 되었습니다')
    // .then(() => {
    //   times.findAll({})})
    // .then(res => {
    //   const set = `set @cnt=0`
    //   const update = `update users set users.id = @cnt:=@cnt+1;`
    //   const idReset = `ALTER TABLE users auto_increment=${res+1};`

    //   times.sequelize.query(set)
    //   times.sequelize.query(update)
    //   times.sequelize.query(idReset)   //27~29 times 테이블 auto_increment 정렬.
    // })
    }
    //쿠키 보내주기

  }

module.exports = withdrawal

// 회원 탈퇴하면 user 뿐만 아니라 times 테이블도 지워야함