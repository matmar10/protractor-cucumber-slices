'use strict';

const { browser, element, by } = require('protractor');

const Errors = require('../utils/errors.js');

const click = function (selector) {
  return element(by.css(selector)).click();
};

const hover = function (selector) {
  return browser.actions().mouseMove(element(by.css(selector))).perform();
};

const submit = function (selector) {
  const form = element.all(by.name(selector), by.css(selector)).first();
  return form
    .getTagName()
    .then((tagName) => {
      if ('form' !== tagName) {
        throw new Error(Errors.ACTION.SUBMIT_FORM);
      }
      return form.submit();
    });
};

const press = function (selector) {
  return element.all(by.partialButtonText(selector), by.partialLinkText(selector), by.css(selector)).first().click();
};

const follow = async function (selector) {
  return element.all(by.linkText(selector), by.partialLinkText(selector), by.css(selector)).first().click();
};

const sendKey = function (key, selector) {
  return element(by.css(selector)).sendKeys(key);
};

module.exports = [
  [/^(?:|I )click on "([^"]*)"/, click],
  [/^(?:|I )press "([^"]*)"/, press],
  [/^(?:|I )follow "([^"]*)"/, follow],
  [/^(?:|I )hover "([^"]*)" element/, hover],
  [/^(?:|I )submit "([^"]*)" form/, submit],
  [/^(?:|I )send key "([^"]*)" in "([^"]*)" element/, sendKey],
];
