import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import authHelper from '../common/helpers/authHelper';
import { secret } from '../config/jwt';

const router = express.Router();

router.post(
    '/jwt', 
    (req, res) => {
        let resp = null;
        const user = authHelper.isAuthorized(req.body.email, req.body.password);

        if (user) {
            const token = jwt.sign(JSON.stringify(user), secret.key);

            resp = {
                code: 200,
                message: 'OK',
                data: user,
                token: token
            };
        } else {
            resp = {
                code: 404,
                message: 'Not Found'
            }
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(resp, null, ' '));
});

router.post(
    '/passport', 
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const user = req.user;
        let resp = null;

        if (user) {
            resp = {
                code: 200,
                message: 'OK',
                data: user
            };
        } else {
            resp = {
                code: 404,
                message: 'Not Found'
            }
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(resp, null, ' '));
});

export default router;