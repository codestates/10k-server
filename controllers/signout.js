const signout = (req, res) => {
    // const data = isAuthorized(req)
    // console.log('data:', data);
    res.status(200).json('로그아웃 완료')
}

module.exports = signout