import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from '../src/routers/users';
import productsRouter from '../src/routers/products';
import cookieParser from '../src/middlewares/cookieParser';
import queryParser from '../src/middlewares/queryParser';

const app = express();
const router = express.Router();

const port = process.env.PORT || 8080; 

app.use(bodyParser.json());
app.use(cookieParser);
app.use(queryParser);

app.listen(port, () => {
    console.log(`Server listen on 8080 port.`);
});

app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.use('/users', usersRouter);
router.use('/products', productsRouter);
