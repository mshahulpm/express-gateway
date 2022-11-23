const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * 
 * @param {string} prefix 
 * @returns 
 */
function rewritePath(prefix) {
    /**
     *  @param {string} path 
     */
    return (path) => path.slice(prefix.length)
}

const app = express();

app.use('/admin', createProxyMiddleware({
    target: 'http://localhost:8050',
    changeOrigin: true,
    pathRewrite: rewritePath('/admin')
}));
app.use('/residents', createProxyMiddleware({
    target: 'http://localhost:8020',
    changeOrigin: true,
    pathRewrite: rewritePath('/residents')
}));


app.listen(3000);
