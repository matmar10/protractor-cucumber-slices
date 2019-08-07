'use strict';

const { expect } = require('chai');
const url = require('url');

const { browser, ExpectedConditions } = require('protractor');
const EC = ExpectedConditions;

/**
 * @module AssertURL
 */
const AssertURL = {

  /**
   * Assert current URL pathname equals ‘/’.
   * /^(?:|I )should be on "([^"]*)"/
   * @example Then I should be on the homepage
   * @return {Promise}         Resolves if assertion passes
   */
  isRoot: function () {
    browser.wait(EC.urlIs('/'), 200);
  },

  /**
   * Assert current URL pathname equals the given string.
   * /^(?:|I )should be on "([^"]*)"$/
   * @example Then I should be on "/post/1"
   * @return {Promise}         Resolves if assertion passes
   */
  isEqual: function (location) {
    browser.wait(EC.urlIs(location), 200);
  },

  /**
   * Assert current URL pathname match against provided RegExp.
   * /the url should match (.+)/
   * @example Then the url should match ^\/post\/\d+
   * @return {Promise}         Resolves if assertion passes
   */
  urlMatch: function (regex) {
    return browser.getLocationAbsUrl()
      .then((url) => {
        expect(url).match(new RegExp(regex));
      });
  },

  /**
   * Assert current URL query string match against provided RegExp.
   * /^the url parameter should match (.+)$/
   * @example Then the url parameter should match ^\/post\/\d+
   * @return {Promise}         Resolves if assertion passes
   */
  queryMatch: function (regex) {
    return browser.getLocationAbsUrl()
      .then((pageUrl) => {
        const parsed = url.parse(pageUrl);
        expect(parsed.query).match(new RegExp(regex));
      });
  },
};

module.exports = [
  [
    /^(?:|I )should be on "([^"]*)"/,
    AssertURL.isEqual,
  ],
  [
    /^(?:|I )should be on (?:|the )homepage/,
    AssertURL.isRoot,
  ],
  [
    /the url should match (.+)/,
    AssertURL.urlMatch,
  ],
  [
    /the url parameter should match (.+)/,
    AssertURL.queryMatch,
  ],
];
