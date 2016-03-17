import r from 'koa-route';
import { signup, signin, authenticated, changePassword } from '../methods/user';
import {
  timersCreate,
  timersById,
  timersDelete,
  timersByCurrentUser,
  timersIndex
} from '../methods/timer';

export default (app) => {

  app.use(r.post('/api/signup',signup));
  app.use(r.post('/api/signin',signin));
  app.use(r.get('/api/alltimers', timersIndex));
  app.use(r.post('/api/timers', timersCreate));
  app.use(r.delete('/api/timers/:timer_id',timersDelete));
  app.use(r.get('/api/timers/:timer_id', timersById));

  app.use(authenticated);
  app.use(r.get('/api/timers', timersByCurrentUser));
  app.use(r.patch('/api/change-password', changePassword));
};
