const https = require('https');
const fs = require('fs');

const express = require('express');
const morgan = require("morgan");
const cors = require('cors');

const signin = require('./controllers/signin')
const signup = require('./controllers/signup')
const signout = require('./controllers/signout')
const mypage = require('./controllers/mypage')
const changeDesc = require('./controllers/changeDesc')
const addGoal = require('./controllers/addGoal')
const removeGoal = require('./controllers/removeGoal')
const withdrawal = require('./controllers/withdrawal')

const app = express();

app.use(express.json())
app.use(morgan);

// app.use(cors());
app.use(
    // cors 설정 보강 (JWT 할 때 확인)
    cors({
        // 클라이언트 도메인 입력
        origin: 'http://10k-bucket.s3-website.ap-northeast-2.amazonaws.com/',
        method: ['GET', 'POST']
        // JWT 토큰 인증 필요?
    })
);

// 라우팅 분기 체크
// 컨트롤러 함수 작성 후 연결
// : id필요한가? JWT 토큰 
app.get('/user/mypage', mypage)
app.post('/user/signin', signin)
app.post('/user/signup', signup)
app.post('/user/signout', signout)
app.post('/goal/add', addGoal)
app.post('/goal/remove', removeGoal)
app.put('/goal/change_desc', changeDesc)
app.delete('/user/delete', withdrawal)

// open ssl? 
// http로 변경 후 ec2 적용
const server = https.createServer(
    {
        key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8')
    },
    app.use('/', (req, res) => {
        res.send('start https server');
    })
).listen('http://theone10k.kro.kr/')

module.exports = server;