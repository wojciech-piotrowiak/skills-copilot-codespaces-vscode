// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = [];

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                console.log(err);
                res.end('read file error');
            } else {
                res.end(data);
            }
        });
    } else if (pathname === '/submit') {
        const comment = urlObj.query;
        comment.dateTime = new Date().toLocaleString();
        comments.push(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else if (pathname === '/getComments') {
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, pathname), (err, data) => {
            if (err) {
                console.log(err);
                res.end('read file error');
            } else {
                res.end(data);
            }
        });
    }
});

server.listen(3000, () => {
    console.log('server is running at http://