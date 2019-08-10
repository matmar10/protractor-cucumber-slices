'use strict';

const { expect } = require('chai');
const { browser, ExpectedConditions } = require('protractor');
const url = require('url');

const EC = ExpectedConditions;

/**
 * @module AssertURL
 */
const AssertURL = {

  /**
   * Assert current URL pathname equals ‘/’.
   *
   * /^(?:|I )should be on "([^"]*)"/
   *
   * @example Then I should be on the homepage
   * @return {Promise}         Resolves if assertion passes
   */
  'on homepage': function () {
    browser.wait(EC.urlIs('/'), 200);
  },

  /**
   * Assert current URL pathname equals the given string.
   *
   * /^(?:|I )should be on "([^"]*)"$/
   *
   * @example Then I should be on "/post/1"
   * @return {Promise}         Resolves if assertion passes
   */
  'url': function (location) {
    browser.wait(EC.urlIs(location), 200);
  },

  /**
   * Assert current URL pathname match against provided RegExp.
   *
   * /the url should match (.+)/
   *
   * @example Then the url should match ^\/post\/\d+
   * @return {Promise}         Resolves if assertion passes
   */
  'url match': function (regex) {
    return browser.getLocationAbsUrl()
      .then((url) => {
        expect(url).match(new RegExp(regex));
      });
  },

  /**
   * Assert current URL query string match against provided RegExp.
   *
   * /^the url parameter should match (.+)$/
   *
   * @example Then the url parameter should match ^\/post\/\d+
   * @return {Promise}         Resolves if assertion passes
   */
  'url query match': function (regex) {
    return browser.getLocationAbsUrl()
      .then((pageUrl) => {
        const parsed = url.parse(pageUrl);
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
