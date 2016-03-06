import r from 'koa-route';
import { signup, signin, authenticated, changePassword } from '../methods/user';

export default (app) => {

  app.use(r.get('/api', function *() {
    this.body = {message: "Hello world!"};
    })
  );
  app.use(r.post('/api/signup',signup));
  app.use(r.post('/api/signin',signin));

  app.use(authenticated);
  app.use(r.patch('/api/change-password', changePassword));
};
