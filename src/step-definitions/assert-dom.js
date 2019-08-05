'use strict';

const { browser, element, by, ExpectedConditions } = require('protractor');

const EC = ExpectedConditions;

const { expect } = require('chai');

const seeText = function (expected) {
  return element(by.css('body')).getText()
    .then((text) => {
      expect(text).to.contain(expected);
    });
};

const notSeeText = function (expected) {
  return element(by.css('body')).getText()
    .then((text) => {
      expect(text).to.not.contain(expected);
    });
};

const matchText = function (regex) {
  return element(by.css('body')).getText()
    .then((text) => {
      expect(text).to.match(regex);
    });
};

const notMatchText = function (regex) {
  return element(by.css('body')).getText()
    .then((text) => {
      expect(text).to.not.match(regex);
    });
};

const elementContainsText = function (expected, selector) {
  return element(by.css(selector)).getText()
    .then((text) => {
      expect(text).to.contain(expected);
    });
};

const elementNotContainsText = function (expected, selector) {
  return element(by.css(selector)).getText()
    .then((text) => {
      expect(text).to.not.contain(expected);
    });
};

const elementTextContainsText = function (expected, selector) {
  return element(by.css(selector))
    .getText().then((text) => {
      expect(text).to.contain(expected);
    });
};

const elementTextNotContainsText = function (expected, selector) {
  return element(by.css(selector)).getText().then((text) => {
    expect(text).to.not.contain(expected);
  });
};

const elementsCount = function (expected, selector) {
  return element.all(by.css(selector))
    .then((items) => {
      expect(items).length.to.equal(expected);
    });
};

const isExisting = function (selector) {
  return browser.wait(EC.presenceOf(element(by.css(selector))), 100);
};

const isNotExisting = function (selector) {
  return browser.wait(EC.stalenessOf(element(by.css(selector))), 100);
};

const isVisible = function (selector) {
  return browser.wait(EC.visibilityOf(element(by.css(selector))), 100);
};

const isNotVisible = function (selector) {
  return browser.wait(EC.invisibilityOf(element(by.css(selector))), 100);
};

const isChecked = expected => function (selector) {
  return element(by.css(selector)).getAttribute('checked')
    .then((isChecked) => {
      expect(isChecked).to.equal(expected);
    });
};

const isDisabled = expected => function (selector) {
  return element(by.css(selector)).getAttribute('disabled')
    .then((isDisabled) => {
      expect(isDisabled).to.equal(expected);
    });
};

module.exports = [
  [/^(?:|I )should see "([^"]*)"$/, seeText],
  [/^(?:|I )should not see "([^"]*)"$/, notSeeText],
  [/^(?:|I )should see text matching (.+)$/, matchText],
  [/^(?:|I )should not see text matching (.+)$/, notMatchText],
  [/^(?:|I )should see (\d+) "([^"]*)" elements?$/, elementsCount],
  [
    /^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/,
    elementContainsText,
  ],
  [
    /^(?:|I )should see "([^"]*)" in the "([^"]*)" element text$/,
    elementTextContainsText,
  ],
  [
    /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/,
    elementNotContainsText,
  ],
  [
    /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element text$/,
    elementTextNotContainsText,
  ],
  [/^(?:|I )should see an? "([^"]*)" element$/, isVisible],
  [/^(?:|I )should not see an? "([^"]*)" element$/, isNotVisible],
  [/the "([^"]*)" element should be visible$/, isVisible],
  [/the "([^"]*)" element should not be visible$/, isNotVisible],
  [/the "([^"]*)" element should exist$/, isExisting],
  [/the "([^"]*)" element should not exist$/, isNotExisting],
  [/the "([^"]*)" (?:field|element) should be enabled$/, isDisabled(false)],
  [/the "([^"]*)" (?:field|element) should be disabled$/, isDisabled(true)],
  [/the "([^"]*)" checkbox should be checked$/, isChecked(true)],
  [/the checkbox "([^"]*)" (?:is|should be) checked$/, isChecked(true)],
  [/the "([^"]*)" checkbox should not be checked$/, isChecked(false)],
  [
    /the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/,
    isChecked(false),
  ],
  [/the checkbox "([^"]*)" is (?:unchecked|not checked)$/, isChecked(false)],
];
