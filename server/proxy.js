import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy middleware configuration
const proxyOptions = {
  target: 'https://api.vextapp.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/v1', // rewrite path
  },
  headers: {
    'Authorization': `Bearer DwAwrasv.0W8DzLOGcrL61csSvmcGOLXG568NX58h`
  }
};

// Create the proxy middleware
app.use('/api', createProxyMiddleware(proxyOptions));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
