'use strict';

const cucumber = require('cucumber');

const definitions = require('./step-definitions/index');

definitions.forEach(([pattern,
  fn]) => {
  cucumber.defineStep(pattern, fn);
});
