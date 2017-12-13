import express from 'express';

import jwt from '../middlewares/jwt';
import { User } from '../models/models';

const router = express.Router();

router.use(jwt);

router.get('/', (req, res) => {
    User
        .all()
        .then((products) => res.status(200).send(products))
        .catch((error) => res.status(400).send(error));
});

router.post('/', (req, res) => {
    const user = {
        "name": req.body.name,
        "surname": req.body.surname,
        "email": req.body.email,
        "password": req.body.password
    };
    
    User.create(user)
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
});
  
export default router;