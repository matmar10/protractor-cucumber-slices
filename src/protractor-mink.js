'use strict';

const cucumber = require('cucumber');

const definitions = require('./step-definitions/index.js');

definitions.forEach(([pattern, fn]) => {
  console.log('Pattern:', pattern);
  cucumber.defineStep(pattern, fn);
});
