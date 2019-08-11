'use strict';

const Promise = require('bluebird');
const { browser } = require('protractor');

const Errors = require('./../utils/errors');

let currentBaseUrl;

// From https://github.com/sindresorhus/is-absolute-url
const isAbsoluteUrl = location => /^(?:\w+:)\/\//.test(location);

function parseUrlWithEnv(location) {
  const matches = /^\${([^"]*)}/.exec(location);
  return (matches)
    ? process.env[matches[1]] + location.replace(matches[0], '')
    : location;
}

function baseUrl(newBaseUrl) {
  if (newBaseUrl) {
    currentBaseUrl = newBaseUrl;
  }
  if (currentBaseUrl) {
    return Promise.resolve(currentBaseUrl);
  }
  return browser.getProcessedConfig()
    .then((config) => {
      if (!config.baseUrl) {
        throw new Error(Errors.NAVIGATION.ROOT);
      }
      currentBaseUrl = config.baseUrl;
      return currentBaseUrl;
    });
}

function getCurrentUrl(excludeBase = true) {
  return Promise.all([
    browser.getCurrentUrl(),
    baseUrl(),
  ])
    .then(([currentUrl,
      currentBaseUrl]) => {
      if (excludeBase) {
        currentUrl = currentUrl.replace(currentBaseUrl, '');
        return parseUrlWithEnv(currentUrl);
      }
      return parseUrlWithEnv(currentUrl);
    });
}

module.exports = {
  isAbsoluteUrl,
  parseUrlWithEnv,
  baseUrl,
  getCurrentUrl,
};
