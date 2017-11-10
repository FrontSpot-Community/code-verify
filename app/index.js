import './libs/mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import config from './configuration';
import routers from './routers';
import * as common from './middlewares/common';
import passportInitializer from './libs/passaportInitializer';
import gitHubStrategyFactory from './libs/githubStrategyFactory';
import _ from 'lodash';

const sessionOptions = {
    secret: config.get('session_secret'),
    resave: true,
    saveUninitialized: true
};

const app = express();

global._root = __dirname;
global._ = _;

app.use(cookieParser());
app.use(session(sessionOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passportInitializer(passport, gitHubStrategyFactory());
app.use('/', routers);
app.use('/docs', express.static('docs'));
app.use(common.errorHandler);
app.listen(config.get('port'), common.listen);
