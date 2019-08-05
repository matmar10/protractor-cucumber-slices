'use strict';

const { expect } = require('chai');
const url = require('url');

const { browser, ExpectedConditions } = require('protractor');
const EC = ExpectedConditions;

const isEqual = function (location) {
  browser.wait(EC.urlIs(location), 200);
};

const isRoot = function () {
  browser.wait(EC.urlIs('/'), 200);
};

const urlMatch = function (regex) {
  return browser.getLocationAbsUrl()
    .then((url) => {
      expect(url).match(new RegExp(regex));
    });
};

const queryMatch = function (regex) {
  return browser.getLocationAbsUrl()
    .then((pageUrl) => {
      const parsed = url.parse(pageUrl);
      expect(parsed.query).match(new RegExp(regex));
    });
};

module.exports = [
  [/^(?:|I )should be on "([^"]*)"/, isEqual],
  [/^(?:|I )should be on (?:|the )homepage/, isRoot],
  [/the url should match (.+)/, urlMatch],
  [/the url parameter should match (.+)/, queryMatch],
];
