import express from 'express';

import users from '../models/users';

const router = express.Router();

router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users, null, ' '));
});
  
export default router;