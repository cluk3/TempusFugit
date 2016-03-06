import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mongoose from 'mongoose';
import routes from './routes';
import logger from 'koa-logger';
import config from '../../config';
import auth from './methods/auth';
import dbConfig from './db_config';
import compress from 'koa-compress';
import historyApiFallback from 'koa-connect-history-api-fallback';
//import cors from 'koa-cors';
var serve = require('koa-static');
var static_path = path.join(config.app.root, '/app/dist');

const app = koa();
/*
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET','HEAD','PUT','POST','DELETE','PATCH']
}));
*/
app.use(compress());
app.use(historyApiFallback());
app.use(serve('../../app/dist'));

dbConfig();

if (config.app.env !== "test") {
  app.use(logger());
}
app.use(auth);
app.use(bodyparser());

app.use(function *(next) {
  this.type = 'json';
  yield next;
});

routes(app);
console.log("worker: " + config.app.port);

export default app.listen(config.app.port);
