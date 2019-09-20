'use strict';

const { defineStep } = require('cucumber');
const { by } = require('protractor');

const steps = require('./step-definitions');
const locators = require('./utils/by');
const elementFinders = require('./utils/element');
const url = require('./utils/url');

const names = Object.keys(locators);
names.forEach((name) => {
  by.addLocator(name, locators[name]);
});

const stepModuleNames = Object.keys(steps);
stepModuleNames.forEach((moduleName) => {
  const module = steps[moduleName];
  const stepNames = Object.keys(module.regex);
  stepNames.forEach((stepName) => {
    const step = module[stepName];
    const regexList = module.regex[stepName];
    regexList.forEach((regex) => {
      defineStep(regex, { timeout: 60 * 1000 }, step);
    });
  });
});

module.exports = {
  steps,
  by: locators,
  element: elementFinders,
  url,
};
