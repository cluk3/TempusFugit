import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mongoose from 'mongoose';
import routes from './routes';
import logger from 'koa-logger';
import path from 'path';
import config from '../../config';
import auth from './methods/auth';
import dbConfig from './db_config';
import compress from 'koa-compress';
import historyApiFallback from 'koa-connect-history-api-fallback';
//import cors from 'koa-cors';
import serve from 'koa-static';
import favicon from 'koa-favicon';

const app = koa();
/*
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET','HEAD','PUT','POST','DELETE','PATCH']
}));
*/
app.use(compress());
app.use(logger());
app.use(favicon(__dirname + '/favicon/favicon.ico'));
app.use(historyApiFallback());
if(config.env === 'production')
  app.use(serve(path.join(config.root,'app','dist')));
else
  app.use(serve(path.join(config.root,'app','build')));
dbConfig();




app.use(auth);
app.use(bodyparser());

app.use(function *(next) {
  this.type = 'json';
  yield next;
});

routes(app);

export default app.listen(config.app.port);
