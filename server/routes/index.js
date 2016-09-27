'use strict';

const path = require('path');
const express = require('express');
const Promise = require('bluebird');

const router = express.Router(); // eslint-disable-line new-cap
const isGenerator = obj => typeof obj.next === 'function' && typeof obj.throw === 'function';
const isGeneratorFunction = (obj) => {
  const constructor = obj.constructor;
  if (!constructor) return false;
  if (constructor.name === 'GeneratorFunction') return true;
  if (constructor.displayName === 'GeneratorFunction') return true;
  return isGenerator(constructor.prototype);
};
const coroutine = (fn) => {
  if (isGeneratorFunction(fn)) {
    const co = Promise.coroutine(fn);
    return (req, res, next) => co(req, res, next).catch(err => next(err));
  }

  return fn;
};

router.get('/api/hello', coroutine((req, res) => {
  res.json('Hello World');
}));

router.all('/api/*', (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views/index.html'));
});

module.exports = router;
