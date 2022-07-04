const express = require('express');
const path = require('path'); // path는 express 내장 모듈이어서 따로 설치 안 해줘도 됨

const app = express();

// * app.use
// 미들웨어를 등록하는 라우터(형태: path, handler) => * 주의: handler가 함수(() => { })형태가 아님
app.use(
  // * 'Failed to load module script: ~' 에러 해결
  // 1) middleware(express.static)로 기본 경로 설정
  //  => '/static'으로 시작되는 경로로 접속 시 frontend/static을 기본 고정 경로로 설정
  // express의 기본 내장 미들웨어
  // 변경되지 않는 정적인 파일(js, css, images 등) static 파일을 지정해두고 "이 요청이 오면 그냥 줘~"라고 서버에게 하는 것
  // 2) js 파일 import 경로에 뒤에 '.js' 확장자 꼭 붙이기!
  '/static',
  express.static(path.resolve(__dirname, 'frontend', 'static'))
);

// app.get: 인자로 req, res를 받아주고 res.send 또는 res.sendFile 사용
// res.send: HTML을 일반 문자열로 응답 => 예: res.send('<h1>coding!</h1>')
// res.sendFile: 실제 HTML 파일을 보내줄 때 => 예: res.sendFile(__dirname + "public/main.html")
// SPA란 HTML 문서가 1개인 애플리케이션 => 모든 경로에서 하나의 index.html을 불러온다
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
  // 그냥 res.sendfile('public/index1.html') 이렇게 쓰면 에러 발생 ('경로는 절대적이거나 root를 지정해야 한다')
  // => __dirname 추가
  // 방법 1) path.resolve 활용
  //    => res.sendFile(path.resolve(__dirname, 'public', 'index.html')); (그냥 콤마(',')로 쭉쭉 연결)
  // 방법 2) { root: __dirname }을 뒤에 추가
  //    => res.sendFile('public/index1.html', { root: __dirname }))
  // * __dirname는 실행 스크립트(server.js)가 있는 경로 (=> 이 프로젝트에서는 root 경로)
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running...');
});
