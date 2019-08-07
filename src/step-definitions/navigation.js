'use strict';

const { browser } = require('protractor');

const Errors = require('./../utils/errors.js');

// From https://github.com/sindresorhus/is-absolute-url
const isAbsoluteUrl = location => /^(?:\w+:)\/\//.test(location);

const parseUrlWithEnv = (location) => {
  const matches = /^\${([^"]*)}/.exec(location);
  return (matches)
    ? process.env[matches[1]] + location.replace(matches[0], '')
    : location;
};

const setBaseURL = function (location) {
  const finalLocation = parseUrlWithEnv(location);
  if (!isAbsoluteUrl(finalLocation)) {
    throw new Error(Errors.NAVIGATION.BASE_URL);
  }
  return browser.get(finalLocation);
};

const goRoot = function () {
  return browser.getProcessedConfig()
    .then((config) => {
      if (!config.baseUrl) {
        throw new Error(Errors.NAVIGATION.ROOT);
      }
      return browser.get(config.baseUrl);
    });
};

const goTo = function (location) {
  if (isAbsoluteUrl(location)) {
    return browser.get(location);
  }
  return browser.setLocation(location);
};

const refresh = function () {
  return browser.refresh();
};

const goBack = function () {
  return browser.navigate().back();
};

module.exports = [
  [/^(?:|I )browse "([^"]*)"/, setBaseURL],
  [/^(?:|I )am on (?:|the )homepage/, goRoot],
  [/^(?:|I )go to (?:|the )homepage/, goRoot],
  [/^(?:|I )am on "([^"]*)"/, goTo],
  [/^(?:|I )go to "([^"]*)"/, goTo],
  [/^(?:|I )reload the page/, refresh],
  [/^(?:|I )move backward one page/, goBack],
];
