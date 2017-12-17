import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import authHelper from '../common/helpers/authHelper';
import { secret } from '../config/jwt';

const router = express.Router();

router.post(
    '/jwt', 
    (req, res) => {
        authHelper.isAuthorized(req.body.email, req.body.password)
            .then((user) => {
                let resp = null;

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

                res.status(resp.code).send(resp)
            })
            .catch(error => res.status(400).send(error));
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