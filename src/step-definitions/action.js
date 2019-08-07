'use strict';

const { browser, element, by } = require('protractor');

const Errors = require('../utils/errors.js');

/**
 * Click on an element based on given selector.
 * @memberof Action
 * @example When I click on "button.showModal"
 * @param  {string} selector Selector of target element
 * @return {Promise}         Resolves after action propogates
 */
const click = function (selector) {
  return element(by.css(selector)).click();
};

/**
 * Hover an element with cursor (activate CSS :hover property).
 * @memberof Action
 * @example When I hover "nav.menu" element
 * @param  {string} selector Selector of target element
 * @return {Promise}         Resolves after action propogates
 */
const hover = function (selector) {
  return browser.actions().mouseMove(element(by.css(selector))).perform();
};

/**
 * Submits a form found by given selector. The submit command may also be applied to any element that is a descendant of a <form> element.
 * @memberof Action
 * @example When I submit "form#register" form
 * @param  {string} selector Selector of target element
 * @return {Promise}         Resolves after action propogates
 */
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

/**
 * Press a button element with string argument interpreted as (in order):
 *   1. CSS Selector
 *   2. Partial text of <button> and <input type="submit"> elements
 *   3. Partial text of <a> elements
 * @memberof Action
 * @example When I press "button.register"
 *          And I press "Register"
 *          And I press "Submit"
 * @param  {string} selector Selector of target element
 * @return {Promise}         Resolves after action propogates
 */
const press = function (selector) {
  return element.all(by.css(selector), by.partialButtonText(selector), by.partialLinkText(selector)).first().click();
};

/**
 * Follow a link element with string argument interpreted as (in order):
 *   1. CSS Selector
 *   3. Partial text of <a> elements
 * @memberof Action
 * @example When I follow "a[href='/about']"
 * @param  {string} selector Selector of target element
 * @return {Promise}         Resolves after action propogates
 */
const follow = async function (selector) {
  return element.all(by.css(selector), by.partialLinkText(selector)).first().click();
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
