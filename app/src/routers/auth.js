import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post(
    '/', 
    passport.authenticate('local', { session: false }),
    (req, res) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify("Uthorized", null, ' '));
});

export default router;