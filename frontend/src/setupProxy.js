const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // API 요청만 백엔드로 프록시
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://app:8080',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
};
