'use strict';

const { browser, element, by } = require('protractor');

const Errors = require('../utils/errors.js');

/**
 * @module Action
 */
const Action = {

  /**
   * Click on an element based on given selector.
   *
   * /^(?:|I )click on "([^"]*)"/
   * @memberof Action
   * @example When I click on "button.showModal"
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action propagates
   */
  click: function (selector) {
    return element(by.css(selector)).click();
  },

  /**
   * Hover an element with cursor (activate CSS :hover property).
   *
   * /^(?:|I )hover "([^"]*)" element/
   *
   * @memberof Action
   * @example When I hover "nav.menu" element
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action propagates
   */
  hover: function (selector) {
    return browser.actions().mouseMove(element(by.css(selector))).perform();
  },

  /**
   * Submits a form found by given selector. The submit command may also be applied to any element that is a descendant of a <form> element.
   *
   * /^(?:|I )submit "([^"]*)" form/
   *
   * @memberof Action
   * @example When I submit "form#register" form
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action propagates
   */
  submit: function (selector) {
    const form = element.all(by.name(selector), by.css(selector)).first();
    return form
      .getTagName()
      .then((tagName) => {
        if ('form' !== tagName) {
          throw new Error(Errors.ACTION.SUBMIT_FORM);
        }
        return form.submit();
      });
  },

  /**
   * Press a button element with string argument interpreted as (in order):
   *   1. CSS Selector
   *   2. Partial text of button and <input type="submit" /> elements
   *   3. Partial text of link elements
   * /^(?:|I )press "([^"]*)"/
   * @memberof Action
   * @example When I press "button.register"
   *          And I press "Register"
   *          And I press "Submit"
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action propagates
   */
  press: function (selector) {
    return element.all(by.css(selector), by.partialButtonText(selector), by.partialLinkText(selector)).first().click();
  },

  /**
   * Follow a link element with string argument interpreted as (in order):
   *   1. CSS Selector
   *   3. Partial text of link elements
   * /^(?:|I )follow "([^"]*)"/
   * @memberof Action
   * @example When I follow "a[href='/about']"
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action propagates
   */
  follow: function (selector) {
    return element.all(by.css(selector), by.partialLinkText(selector)).first().click();
  },

  /**
   * Send the key(s) to the matched element
   * /^(?:|I )send key "([^"]*)" in "([^"]*)" element/
   * @memberof Action
   * @example When I send key "Matthew" in "input[name='firstname']"
   * @param  {string} key      Key(s) to send
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action propagates
   */
  sendKey: function (key, selector) {
    return element(by.css(selector)).sendKeys(key);
  },
};

module.exports = [
  [
    /^(?:|I )click on "([^"]*)"/,
    Action.click,
  ],
  [
    /^(?:|I )press "([^"]*)"/,
    Action.press,
  ],
  [
    /^(?:|I )follow "([^"]*)"/,
    Action.follow,
  ],
  [
    /^(?:|I )hover "([^"]*)" element/,
    Action.hover,
  ],
  [
    /^(?:|I )submit "([^"]*)" form/,
    Action.submit,
  ],
  [
    /^(?:|I )send key "([^"]*)" in "([^"]*)" element/,
    Action.sendKey,
  ],
];
