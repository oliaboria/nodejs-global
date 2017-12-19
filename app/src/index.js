import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import config from '../config/config';

import cookieParser from '../src/middlewares/cookieParser';
import queryParser from '../src/middlewares/queryParser';

import authRouter from '../src/routers/auth';
import citiesRouter from '../src/routers/cities';
import productsRouter from '../src/routers/products';
import usersRouter from '../src/routers/users';

import '../src/config/passport';

mongoose.connect(config.mongoUrl);

const app = express();
const router = express.Router();

const port = process.env.PORT || 8080; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser);
app.use(queryParser);

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log(`Server listen on 8080 port.`);
});

app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.use('/auth', authRouter);
router.use('/cities', citiesRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
