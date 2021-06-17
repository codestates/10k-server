const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken,
  } = require('./tokenFunctions');
  
const { users } = require('../DataBase/models')


const signin = async (req,res) => {
    const {email, password} = req.body
    let userinfo = await users.findOne({where:{email:email, password:password}}) //회원인지 아닌지 확인

    if(!userinfo){  //회원이 아니라면
        res.status(401).send({message:'회원이 아닙니다'})
    }
    // 회원인 경우
    delete userinfo.dataValues.password;
    // res.status(200).json({
    //     accessToken: accessToken
    // })
    const accessToken = generateAccessToken(userinfo.dataValues);
    // const refreshToken = generateRefreshToken(userinfo.dataValues);

    // sendRefreshToken(res, refreshToken);
    // res.cookie("accessToken", accessToken, {
    //     httpOnly: false,
    // });
    res.cookie('login', true);
    res.cookie('accessToken', accessToken)
    sendAccessToken(res, accessToken);
    // 로그인 요청을 받으면 회원인지 확인한다.
    // 회원이 아니라면 메세지를 하나 띄워준다. 회원이 아닙니다.
    
    // 회원인지 확인 후 회원이라면 accessToken, refreshToken을 발행한다.
    // 응답에 accessToken을 담아서 보내주고 reFreshToken도 함께 보내준다.
}

module.exports = signin