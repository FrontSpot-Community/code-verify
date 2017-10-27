import './libs/mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import config from './configuration';
import routers from './routers';
import * as common from './middlewares/common';

const app = express();

global._root = __dirname;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', routers);
app.use(common.errorHandler);
app.listen(config.get('port'), common.listen);
