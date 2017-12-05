import express from 'express';
import through2 from 'through2';

import users from '../models/users';

const router = express.Router();
const filePath = './app/src/models/users.json';

router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users, null, ' '));
});
  
  export default router;