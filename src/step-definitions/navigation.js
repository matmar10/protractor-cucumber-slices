'use strict';

const { browser } = require('protractor');

const Errors = require('./../utils/errors.js');

// From https://github.com/sindresorhus/is-absolute-url
const isAbsoluteUrl = location => /^(?:\w+:)\/\//.test(location);

function parseUrlWithEnv(location) {
  const matches = /^\${([^"]*)}/.exec(location);
  return (matches)
    ? process.env[matches[1]] + location.replace(matches[0], '')
    : location;
}

/**
 * @module Navigation
 */
const Navigation = {

  /**
   * Set driver’s baseUrl. Useful to use short path in subsequent navigation (ex: “/login”)
   *
   * /^(?:|I )browse "([^"]*)"/
   *
   * @example When I browse "http://127.0.0.1:3000/
   * @param  {string} location The base URL as a full, absolute URL
   * @return {Promise}         Resolves when the action completes
   */
  'base url': function (location) {
    const finalLocation = parseUrlWithEnv(location);
    if (!isAbsoluteUrl(finalLocation)) {
      throw new Error(Errors.NAVIGATION.BASE_URL);
    }
    return browser.get(finalLocation);
  },

  /**
   * Navigate to homepage, ie: baseUrl + ‘/’
   *
   * /^(?:|I )am on (?:|the )homepage$/
   *
   * /^(?:|I )go to (?:|the )homepage/
   *
   * @example When I am on the homepage
   * @example When I go to the homepage
   * @example When I go to homepage
   * @return {Promise} Resolves when the action completes
   */
  'homepage': function () {
    return browser.getProcessedConfig()
      .then((config) => {
        if (!config.baseUrl) {
          throw new Error(Errors.NAVIGATION.ROOT);
        }
        return browser.get(config.baseUrl);
      });
  },

  /**
   * Browse given URL or path. Protractor assumes it is an angular page
   *
   * /^(?:|I )am on "([^"]*)"/
   *
   * /^(?:|I )go to "([^"]*)"/
   *
   * @example When I am on "/post/2"
   * @example When I go to "/articles/why-to-use-cucumber"
   * @param  {string} location Path to browse to, either absolute or relative
   * @return {Promise} Resolves when action completes
   */
  'browse': function (location) {
    if (isAbsoluteUrl(location)) {
      return browser.get(location);
    }
    return browser.setLocation(location);
  },

  /**
   * Reload the current page.
   *
   * /^(?:|I )reload the page/
   *
   * @example When I reload the page
   * @return {Promise} Resolves when action completes
   */
  'reload': function () {
    return browser.refresh();
  },

  /**
   * Navigate backwards in the browser history, if possible.
   *
   * /^(?:|I )move backward one page/
   *
   * @example When I move backward one page
   * @return {Promise} Resolves when action completes
   */
  'back': function () {
    return browser.navigate().back();
  },
};

module.exports = [
  [
    /^(?:|I )browse "([^"]*)"/,
    Navigation['base url'],
  ],
  [
    /^(?:|I )am on (?:|the )homepage/,
    Navigation['homepage'],
  ],
  [
    /^(?:|I )go to (?:|the )homepage/,
    Navigation['homepage'],
  ],
  [
    /^(?:|I )am on "([^"]*)"/,
    Navigation['browse'],
  ],
  [
    /^(?:|I )go to "([^"]*)"/,
    Navigation['browse'],
  ],
  [
    /^(?:|I )reload the page/,
    Navigation['reload'],
  ],
  [
    /^(?:|I )move backward one page/,
    Navigation['back'],
  ],
];
