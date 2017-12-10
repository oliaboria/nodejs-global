import * as fs from 'fs';
import { createServer } from 'http';
import through from 'through2';

const replacer = () =>
    through((chunk, enc, cb) => {
        const content = chunk.toString();

        const newContent = content.replace('{message}', 'Hello, World!');
        cb(null, newContent);
    });

export default createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    fs.createReadStream('./app/src/http-servers/index.html')
        .pipe(replacer())
        .pipe(res);
});