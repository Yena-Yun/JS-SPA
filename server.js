const express = require('express');
const path = require('path');

const app = express();

// middleware(express.static)로 기본 경로 설정
//  => '/static'으로 시작되는 경로로 접속 시 frontend/static을 기본 고정 경로로 설정
app.use(
  '/static',
  express.static(path.resolve(__dirname, 'frontend', 'static'))
);

// SPA란 HTML 문서가 1개인 애플리케이션
//  => 모든 경로에서 index.html을 불러온다
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running...');
});
