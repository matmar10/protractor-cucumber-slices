'use strict';

const { defineStep } = require('cucumber');
const { by } = require('protractor');

const definitions = require('./step-definitions/index');
const locators = require('./utils/by');
const elementFinders = require('./utils/element');

const names = Object.keys(locators);
names.forEach(name => by.addLocator(name, locators[name]));

definitions.forEach((step) => {
  const [pattern,
    fn] = step;
  defineStep(pattern, fn);
});

module.exports = {
  steps: definitions,
  by: locators,
  element: elementFinders,
};
