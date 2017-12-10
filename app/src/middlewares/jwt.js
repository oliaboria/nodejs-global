import jwt from 'jsonwebtoken';

import { secret } from '../config/jwt';

export default (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, secret.key, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }
        
        res.username = decoded.username;
        return next();
    });
};