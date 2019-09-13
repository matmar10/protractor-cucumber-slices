'use strict';

const Promise = require('bluebird');
const { browser } = require('protractor');

const Errors = require('./../utils/errors');

/**
 * @module url
 */
const url = {

  aliases: {},

  /**
   * Check whether given location is an absolute URL
   * @param  {string} location URL to check
   * @return {boolean}         Whether is absolute (or not)
   */
  isAbsolute: function isAbsolute(location) {
    // From https://github.com/sindresorhus/is-absolute-url
    return /^(?:\w+:)\/\//.test(location);
  },

  /**
   * Replace all template variables with configured URL aliases
   * URL returns unaltered if there are no template variables inside
   * @param  {string} location The URL
   * @return {string}          URL with replacements made
   */
  parseWithEnv: function parseWithEnv(location) {
    const matches = /^\${([^"]*)}/.exec(location);
    return (matches)
      ? url.aliases[matches[1]] + location.replace(matches[0], '')
      : location;
  },

  /**
   * Get/set a base URL for all subsequent tests
   * Defaults to the `baseUrl` parameter in protractor config
   * @param  {string} [newBaseUrl=false] Optional new base URL to set
   * @return {string}                    The current base URL
   */
  base: function base(newBaseUrl = false) {
    function setAndGetBaseUrl(newBaseUrlToSet) {
      if (newBaseUrlToSet) {
        newBaseUrlToSet = url.parseWithEnv(newBaseUrlToSet);
        url.aliases['baseUrl'] = newBaseUrlToSet;
      }
      return Promise.resolve(url.aliases['baseUrl']);
    }

    if (!url.aliases['baseUrl']) {
      return browser.getProcessedConfig()
        .then((config) => {
          if (!config.baseUrl) {
            throw new Error(Errors.NAVIGATION.ROOT);
          }
          url.aliases['baseUrl'] = config.baseUrl;
          return setAndGetBaseUrl(newBaseUrl);
        });
    }

    return setAndGetBaseUrl(newBaseUrl);
  },

  /**
   * Get the current browser URL, optionall ignoring the configured base url
   * @param  {Boolean} [excludeBase=true] Whether to exclude base URL
   * @return {string}                     The current URL
   */
  getCurrent: function getCurrent(excludeBase = true) {
    return Promise.all([
      browser.getCurrentUrl(),
      url.base(),
    ])
      .then(([currentUrl,
        currentBaseUrl]) => {
        if (excludeBase) {
          currentUrl = currentUrl.replace(currentBaseUrl, '');
          return currentUrl;
        }
        return currentUrl;
      });
  },

  /**
   * Get/set an URL alias which can be used in templates with `${name}` syntax
   * @example const { url } = require('protractor-cucumber-slices');
   * url.alias('login', '/user/auth/login');
   *
   * Scenario: Visit login page
   *   When I browse "${login}"
   *   And I press "Login"
   *   Then I should see "Email is required"
   *   And I should see "Password is required"
   *
   * @param  {string} alias       Alias of URL to get/set
   * @param  {string} [url=null]  New URL to set for the alias
   * @return {string}             Returns the URL set for this alias
   */
  alias: function alias(alias, url = null) {
    if (alias && url) {
      url.aliases[alias] = url;
    }
    return url.aliases[alias];
  },


  /**
   * Fetch the given URL, using the timeout (if provided).
   * Defaults to the protractor getPageTimeout
   *
   * @param  {string} url       The URL to load
   * @param  {number} [timeout] (optional) Timeout in milliseconds
   * @return {Promise}          Resolves when the page is loaded
   */
  browserGetWithTimeout: function browserGetWithTimeout(url, timeout) {
    return browser.getProcessedConfig()
      .then(config => browser.get(url, timeout || config.getPageTimeout || 5000));
  },
};

module.exports = url;
