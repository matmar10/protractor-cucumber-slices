'use strict';

const Promise = require('bluebird');
const { browser } = require('protractor');

const Errors = require('./../utils/errors');

const aliases = {};

// From https://github.com/sindresorhus/is-absolute-url
const isAbsolute = location => /^(?:\w+:)\/\//.test(location);

function parseWithEnv(location) {
  const matches = /^\${([^"]*)}/.exec(location);
  return (matches)
    ? aliases[matches[1]] + location.replace(matches[0], '')
    : location;
}

function base(newBaseUrl) {
  function setAndGetBaseUrl(newBaseUrlToSet) {
    if (newBaseUrlToSet) {
      newBaseUrlToSet = parseWithEnv(newBaseUrlToSet);
      aliases['baseUrl'] = newBaseUrlToSet;
    }
    return Promise.resolve(aliases['baseUrl']);
  }

  if (!aliases['baseUrl']) {
    return browser.getProcessedConfig()
      .then((config) => {
        if (!config.baseUrl) {
          throw new Error(Errors.NAVIGATION.ROOT);
        }
        aliases['baseUrl'] = config.baseUrl;
        return setAndGetBaseUrl(newBaseUrl);
      });
  }

  return setAndGetBaseUrl(newBaseUrl);
}

function getCurrent(excludeBase = true) {
  return Promise.all([
    browser.getCurrent(),
    base(),
  ])
    .then(([currentUrl,
      currentBaseUrl]) => {
      if (excludeBase) {
        currentUrl = currentUrl.replace(currentBaseUrl, '');
        return parseWithEnv(currentUrl);
      }
      return parseWithEnv(currentUrl);
    });
}

function alias(alias, url) {
  if (alias && url) {
    aliases[alias] = url;
  }
  return aliases[alias];
}

module.exports = {
  alias,
  base,
  getCurrent,
  isAbsolute,
  parseWithEnv,
};
