import express from 'express';

import jwt from '../middlewares/jwt';
const users = [];

const router = express.Router();

router.use(jwt);

router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users, null, ' '));
});
  
export default router;