import express from 'express';

import jwt from '../middlewares/jwt';
import User from '../models/user';

const router = express.Router();

router.use(jwt);

router.get('/', (req, res) => {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }

        res.json(users);
    });
});

router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) {
            res.send(err);
        }

        res.json(user);
    });
});
  
export default router;