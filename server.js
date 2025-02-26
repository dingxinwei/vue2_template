// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8081;

// 中间件：检查预生成的 .gz 文件并设置响应头
app.get('*', (req, res, next) => {
  const gzPath = `${req.path}.gz`;
  console.log(gzPath);
  if (fs.existsSync(`./dist${gzPath}`)) {
    res.set('Content-Encoding', 'gzip');
    req.url = gzPath;
  }
  next();
});

// 托管静态文件
app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
