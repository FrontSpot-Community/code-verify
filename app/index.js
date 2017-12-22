import './libs/mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import config from './configuration';
import routers from './routers';
import * as common from './middlewares/common';
import passportInitializer from './libs/passaportInitializer';
import gitHubStrategyFactory from './libs/githubStrategyFactory';

const sessionOptions = {
    secret: config.get('session_secret'),
    resave: true,
    saveUninitialized: true
};
const app = express();

app.use(morgan('common'));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passportInitializer(passport, gitHubStrategyFactory());
app.use('/', routers);
app.use('/docs', express.static('docs'));
app.use(common.errorHandler);
app.listen(config.get('port'), common.listen);
