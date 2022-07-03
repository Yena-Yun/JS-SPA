const express = require('express');
const path = require('path');

const app = express();

// SPA란 HTML 문서가 1개인 애플리케이션
//  => 모든 경로에서 index.html을 불러온다
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('frontend', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running...');
});
