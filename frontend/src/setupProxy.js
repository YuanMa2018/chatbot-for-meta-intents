const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001/',
      // target: 'http://172.17.0.2:5002/',
      changeOrigin: true,
    //   pathRewrite: { '^/api': '' }
    })
  );
};
