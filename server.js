//server.js
 
// node.js의 http모듈을 변수 http로 추출합니다.
var http = require('http');
 
// http모듈의 createServer 함수를 호출하여 서버를 생성합니다.
// req: request. 웹 요청 매개변수, res: response. 웹 응답 매개변수
http.createServer(function (req, res) {
    // writeHead: 응답 헤더를 작성합니다.
    // 200: 응답 성공, text/html: html문서
    res.writeHead(200, {'Content-Type': 'text/html'});
    // end: 응답 본문을 작성합니다.
    res.end('Hello World');
    // listen: 매개변수로 포트와 호스트를 지정합니다.
}).listen(80, 'ec2-13-209-4-81.ap-northeast-2.compute.amazonaws.com');
console.log('Server running');

// 웹 서버는 기본적으로 80포트를 사용합니다. 따라서 포트를 입력하지 않고 http://127.0.0.1/로 접속하게 되면 기본적으로 http://127.0.0.1:80/으로 인식합니다. 즉 listen에서 포트를 80으로 한다면 주소뒤에 포트번호를 입력하지 않아도 됩니다. 하지만 80포트를 사용하려면 다른 웹 서버와 충돌하지 않아야 하며, 관리자 권한(sudo)이 필요할 수도 있습니다.
