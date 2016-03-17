import 'babel-polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/server';
import mongoose from 'mongoose';
import config from '../../config';
const Timer = mongoose.model('Timer');
const Interval = mongoose.model('Interval');
let timer_id;

describe('Timers', () => {

  before( function(done) {
    const intervals = [0,0,0,0].map((_, i) => {
      const interval = new Interval({
        type: 'Interval '+(i+1),
        repeat: 1+i,
        rounds: [
          {
            name: 'Round 1',
            duration: 35,
            color: '#34ff45'
          },
          {
            name: 'Round 2',
            duration: 15,
            color: '#22adff'
          }
        ]
      });
      return interval.save();
    });
    Promise.all(intervals)
    .then((results) => {
      const timer = new Timer({
        name: 'Foo Timer',
        intervals: results.map((interval) => interval._id)
      });
      return timer.save();
    })
    .then((result) => {
      timer_id = result._id;
      done();
    })
    .catch((err) => done(err));
  });

  it('should create a timer on /api/timers POST', (done) => {
    const intervals = [0,0,0,0].map((_, i) => {
      const interval = new Interval({
        type: 'Interval '+(i+1),
        repeat: 1+i,
        rounds: [
          {
            name: 'Round 1',
            duration: 35,
            color: '#34ff45'
          },
          {
            name: 'Round 2',
            duration: 15,
            color: '#22adff'
          }
        ]
      });
      return interval;
    });
    request(app)
    .post('/api/timers')
    .type('form')
    .send({
      name: 'Foo Timer 2',
      intervals: JSON.stringify(intervals)
    })
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function(err, res){
      if (err) return done(err);
      const timer = res.body.data;
      expect(res.body.data).to.be.an('object');
      expect(timer.attributes.name).to.equal('Foo Timer 2');
      expect(timer.intervals).to.be.an('array');
      expect(timer.intervals[0].attributes.type).to.equal('Interval 1');
      expect(timer.intervals[0].rounds).to.be.an('array');
      done();
    });
  });

  it('should list all timers on /api/all-timers GET', (done) => {
    request(app)
    .get('/api/alltimers')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      const timer = res.body.data[0];
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.equal(2);
      expect(timer.attributes.name).to.equal('Foo Timer');
      expect(res.body.data[1].attributes.name).to.equal('Foo Timer 2');
      expect(timer.intervals).to.be.an('array');
      expect(timer.intervals[0].attributes.type).to.equal('Interval 1');
      expect(timer.intervals[0].rounds).to.be.an('array');
      done();
    });
  });

  it('should list a timer on /api/timers/:timer_id GET', (done) => {
    request(app)
    .get('/api/timers/'+timer_id)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      const timer = res.body.data;
      expect(res.body.data).to.be.an('object');
      expect(timer.attributes.name).to.equal('Foo Timer');
      expect(timer.intervals).to.be.an('array');
      expect(timer.intervals[0].attributes.type).to.equal('Interval 1');
      expect(timer.intervals[0].rounds).to.be.an('array');
      done();
    });
  });


  it('should delete a timer on /api/timers/:timer_id DELETE', (done) => {
    request(app)
    .delete('/api/timers/'+timer_id)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      expect(res.body.meta).to.eql('Timer removed successfully');
      done();
    });
  });
/*
  it('should return error if response has no password field', (done) => {
    request(app)
    .post('/signin')
    .send({
      username: 'john'
    })
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Missing password']);
      done();
    });
  });

  it('should return error if response has no psw and username field', (done) => {
    request(app)
    .post('/signin')
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Missing username','Missing password']);
      done();
    });
  });

  it('should return error if invalid username', (done) => {
    request(app)
    .post('/signin')
    .send({
      username: 'johny',
      password: 'wordpass'
    })
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Invalid username']);
      done();
    });
  });

  it('should return error if psw does not match', (done) => {
    request(app)
    .post('/signin')
    .send({
      username: 'john',
      password: 'wrongpass'
    })
    .expect('Content-Type', /json/)
    .expect(422)
    .end(function(err, res){
      expect(res.body.errors).to.eql(['Password does not match']);
      done();
    });
  });
*/

  after((done) => {
    mongoose.connection.db.dropCollection('timers', (err, result) => {
      if (err) done(err);
      mongoose.connection.db.dropCollection('intervals', (err, result) => {
        if (err) done(err);
        done();
      });
    });
  });

});
