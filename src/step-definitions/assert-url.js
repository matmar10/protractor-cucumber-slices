'use strict';

const Promise = require('bluebird');
const { expect } = require('chai');
const url = require('url');

const { base, getCurrent, isAbsolute, parseWithEnv } = require('./../utils/url');

/**
 * @module AssertURL
 */
const AssertURL = {

  regex: {
    'on homepage': [
      /^(?:|I )should be on (?:|the )homepage/,
    ],
    'url': [
      /^(?:|I )should be on (?:|the )(?:|page )"([^"]*)"(?:| page)$/,
    ],
    'url match': [
      /the url should match (.+)/,
    ],
    'url query match': [
      /the url parameter should match (.+)/,
    ],
  },

  /**
   * Assert current URL pathname equals ‘/’.
   *
   * #### Patterns
   *
   * - /^(?:|I )should be on "([^"]*)"/
   *
   * @example Then I should be on the homepage
   * @return {Promise}         Resolves if assertion passes
   */
  'on homepage': function () {
    return Promise.all([
      getCurrent(false),
      base(),
    ])
      .then(([currentUrl,
        currentBaseUrl]) => {
        if ('/' === currentUrl.replace(currentBaseUrl, '')) {
          currentUrl = currentUrl.substring(0, currentUrl.length - 1);
        }
        expect(currentUrl).to.equal(currentBaseUrl);
      });
  },

  /**
   * Assert current URL pathname equals the given string.
   * The string provided will be pre-parsed for any configured URL aliases
   *
   * #### Patterns
   *
   * - /^(?:|I )should be on (?:|the )"([^"]*)"(?:| page)$/
   * - /^(?:|I )should be on (?:|the )(?:|page )"([^"]*)"$/
   *
   * @example Then I should be on "/post/1"
   * @return {Promise}         Resolves if assertion passes
   */
  'url': function (location) {
    location = parseWithEnv(location);
    return getCurrent(!isAbsolute(location))
      .then(currentUrl => expect(currentUrl).to.equal(location));
  },

  /**
   * Assert current URL pathname match against provided RegExp.
   * The pattern provided will be pre-parsed for any configured URL aliases
   *
   * #### Patterns
   *
   * - /the url should match (.+)/
   * - /the url should match (.+)/
   *
   * @example Then the url should match ^\/post\/\d+
   *
   * @example Then the url should match ${view post}
   *
   * @return {Promise}         Resolves if assertion passes
   */
  'url match': function (regex) {
    regex = parseWithEnv(regex);
    return getCurrent(true)
      .then((currentUrl) => {
        expect(currentUrl).match(new RegExp(regex));
      });
  },

  /**
   * Assert current URL query string match against provided RegExp.
   *
   * #### Patterns
   *
   * - /^the url parameter should match (.+)$/
   *
   * @example Then the url parameter should match ^\/post\/\d+
   * @return {Promise}         Resolves if assertion passes
   */
  'url query match': function (regex) {
    return getCurrent(true)
      .then((currentUrl) => {
        const parsed = url.parse(currentUrl);
        expect(parsed.query).match(new RegExp(regex));
      });
  },
};

module.exports = AssertURL;
