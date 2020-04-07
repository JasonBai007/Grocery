// 以下是在服务器上运行的监听github的webhook的服务
// 需要在github上开启webhook
// 在服务器上使用forever持久化这个服务（pm2有问题！）
// forever start server.js
// forever logs 0
// forever restart server.js
var path = require("path");
var http = require("http");
var cp = require("child_process");
var webhookHandler = require("github-webhook-handler");
var handler = webhookHandler({ path: "/", secret: "your secret" });
// 部署脚本路径
var shellPath = path.resolve(__dirname, "./deploy.sh");

http
  .createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404;
      res.end("no such location");
    });
  })
  .listen(8866); // 配置webhook监听端口

handler.on("error", function (err) {
  console.error("Error:", err.message);
});

// 监听push请求
handler.on("push", function (event) {
  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref
  );
  // 收到Push请求后，就执行对应的shell脚本，进行部署
  cp.execFile(shellPath, function (err) {
    console.log(err);
  });
});

handler.on("issues", function (event) {
  console.log(
    "Received an issue event for %s action=%s: #%d %s",
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title
  );
});
