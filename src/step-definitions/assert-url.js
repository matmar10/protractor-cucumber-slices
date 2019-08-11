'use strict';

const { expect } = require('chai');
const { ExpectedConditions } = require('protractor');
const url = require('url');

const { isAbsoluteUrl, getCurrentUrl } = require('./../utils/url');

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
    return EC.urlIs('/')().then(res => expect(res).to.equal(true));
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
    location = (0 === location.indexOf('/')) ? location.substring(1) : location;
    return getCurrentUrl(!isAbsoluteUrl(location))
      .then(currentUrl => expect(currentUrl).to.equal(location));
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
    return getCurrentUrl(true)
      .then((currentUrl) => {
        expect(currentUrl).match(new RegExp(regex));
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
    return getCurrentUrl(true)
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
