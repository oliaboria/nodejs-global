import express from 'express';

import usersRouter from '../src/routers/users';

const app = express();
const router = express.Router();

const port = process.env.PORT || 8080; 

app.listen(port, () => {
    console.log(`Server listen on 8080 port.`);
});

app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.use('/users', usersRouter);
