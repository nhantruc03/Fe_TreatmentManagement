import { BackEndUrl } from './components/env'
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: BackEndUrl,
      changeOrigin: true,
    })
  );
};
