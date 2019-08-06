'use strict';

const cucumber = require('cucumber');

const definitions = require('./step-definitions/index.js');

definitions.forEach(([pattern, fn]) => {
  cucumber.defineStep(pattern, fn);
});
