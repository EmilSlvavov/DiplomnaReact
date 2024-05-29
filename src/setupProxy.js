const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://emil-backend.popetsmaster.com",
      changeOrigin: true,
    })
  );
};
