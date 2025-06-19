const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = 3005;

// All requests to /api/* will be forwarded to the WAMP server on port 80
app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:80', // Your WAMP server
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/', // Rewrite paths: remove /api prefix
    },
}));

// Serve static files (index.html, radar.js, etc.) from the current directory
app.use(express.static(__dirname));

// A catch-all to serve index.html for any other request.
// This is useful for single-page applications but also works well here.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`siia-radar server running on http://localhost:${port}`);
  console.log('Proxying API requests from /api to http://localhost:80');
});


