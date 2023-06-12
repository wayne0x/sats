const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

// 配置运行端口
const port = process.env.PORT || 30011;
// 判断是否为开发环境
const dev = process.env.NODE_ENV !== "production";
// 初始化 app
const app = next({ dev });
const handle = app.getRequestHandler();

// 代理配置表，这里和一般的 webpack 配置是一样的。
const proxyTable = {
  "/api": {
    target: "http://18.118.160.68:6137/api",
    pathRewrite: {
      "^/api": "/",
    },
    changeOrigin: true,
  },
};

app
  .prepare()
  .then(() => {
    const server = express();

    // 如果是开发环境，则代理接口
    if (dev) {
      server.use("/api", createProxyMiddleware(proxyTable["/api"]));
    }

    // 托管所有请求
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error:::::", err);
  });

// const { proxyMiddleware } = require("http-proxy-middleware");
// "dev": "next dev -p 30011",
// module.exports = function (app) {
//   app.use(
//     proxy("/hug", {
//       target: "http://18.118.160.68:6137/hug/", // 端口自己配置合适的
//       changeOrigin: true,
//       pathRewrite: {
//         "^/hug": "/",
//       },
//     })
//   );
// };

// const express = require("express");
// const next = require("next");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const devProxy = {
//   "/hug": {
//     target: "http://18.118.160.68:6137/hug/", // 端口自己配置合适的
//     pathRewrite: {
//       "^/hug": "/",
//     },
//     changeOrigin: true,
//   },
// };

// const port = parseInt(process.env.PORT, 10) || 3000;
// const dev = process.env.NODE_ENV !== "production";
// const app = next({
//   dev,
// });
// const handle = app.getRequestHandler();

// app
//   .prepare()
//   .then(() => {
//     const server = express();
//     if (dev && devProxy) {
//       Object.keys(devProxy).forEach(function (context) {
//         server.use(createProxyMiddleware(context, devProxy[context]));
//       });
//     }

//     server.all("*", (req, res) => {
//       handle(req, res);
//     });

//     server.listen(port, (err) => {
//       if (err) {
//         throw err;
//       }
//       console.log(`> Ready on http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log("An error occurred, unable to start the server");
//     console.log("发生错误，无法启动服务器");
//     console.log(err);
//   });
