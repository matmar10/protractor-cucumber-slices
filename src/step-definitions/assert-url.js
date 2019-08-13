'use strict';

const Promise = require('bluebird');
const { expect } = require('chai');
const url = require('url');

const { baseUrl, getCurrent, isAbsolute, parseWithEnv } = require('./../utils/url');

/**
 * @module AssertURL
 */
const AssertURL = {

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
      baseUrl(),
    ])
      .then(([currentUrl,
        currentBaseUrl]) => expect(currentUrl).to.equal(currentBaseUrl));
  },

  /**
   * Assert current URL pathname equals the given string.
   * The string provided will be pre-parsed for any configured URL aliases
   *
   * #### Patterns
   *
   * - /^(?:|I )should be on "([^"]*)"$/
   *
   * @example Then I should be on "/post/1"
   * @return {Promise}         Resolves if assertion passes
   */
  'url': function (location) {
    // remove preceding "/" since it's part of base URL
    location = parseWithEnv(location);
    location = (0 === location.indexOf('/')) ? location.substring(1) : location;
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

module.exports = [
  [
    /^(?:|I )should be on (?:|the )homepage/,
    AssertURL['on homepage'],
  ],
  [
    /^(?:|I )should be on "([^"]*)"/,
    AssertURL['url'],
  ],
  [
    /the url should match (.+)/,
    AssertURL['url match'],
  ],
  [
    /the url parameter should match (.+)/,
    AssertURL['url query match'],
  ],
];
