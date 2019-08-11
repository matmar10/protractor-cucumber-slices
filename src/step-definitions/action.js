'use strict';

const { browser, element, by } = require('protractor');

const { any } = require('./../utils/element');
const Errors = require('./../utils/errors');

/**
 * @module Action
 */
const Action = {

  /**
   * Click on an element based on given selector.
   *
   * /^(?:|I )click on (?:|the )"([^"]*)"/
   *
   * @memberof Action
   * @example When I click on "button.showModal"
   * @example When I click on the "input[type='submit']"
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action completes
   */
  click: function (selector) {
    return element(by.css(selector)).click();
  },

  /**
   * Hover an element with cursor (activate CSS :hover property).
   *
   * /^(?:|I )hover (?:|over ) (?:|the)"([^"]*)" element/
   *
   * @memberof Action
   * @example When I hover "nav.menu" element
   * @example When I hover the "select:eq(1)" element
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action completes
   */
  hover: function (selector) {
    return browser.actions().mouseMove(element(by.css(selector))).perform();
  },

  /**
   * Submits a form found by given selector. The submit command may also be applied to any element that is a descendant of a form element.
   *
   * /^(?:|I )submit (?:|the )"([^"]*)" form/
   *
   * @memberof Action
   * @example When I submit "form#register" form
   * @example When I submit the "form.login" form
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action completes
   */
  submit: function (selector) {
    return any(by.name(selector), by.css(selector))
      .then(form => form
        .getTagName()
        .then((tagName) => {
          if ('form' !== tagName) {
            throw new Error(Errors.ACTION.SUBMIT_FORM);
          }
          return form.submit();
        }));
  },

  /**
   * Press a button element with string argument interpreted as (in order):
   *   1. CSS Selector
   *   2. Partial text of button and input (of type="submit") elements
   *   3. Partial text of link elements
   *
   * /^(?:|I )press "([^"]*)"/
   *
   * @memberof Action
   * @example When I press "button.register"
   * And I press "Register"
   * And I press "Submit"
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action completes
   */
  press: function (selector) {
    return any(by.partialButtonText(selector), by.partialLinkText(selector))
      .then(button => button.click());
  },

  /**
   * Follow a link element with string argument interpreted as (in order):
   * 1. CSS Selector
   * 3. Partial text of link elements
   *
   * /^(?:|I )follow "([^"]*)"/
   *
   * @memberof Action
   * @example When I follow "a[href='/about']"
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action completes
   */
  follow: function (selector) {
    return any(by.partialButtonText(selector), by.partialLinkText(selector))
      .then(link => link.click());
  },

  /**
   * Send the key(s) to the matched element
   *
   * /^(?:|I )send key "([^"]*)" in "([^"]*)" element/
   *
   * /^(?:|I )type "([^"]*)" in(?:|to) (?:|the )"([^"]*)" element/
   *
   * @memberof Action
   * @example When I send key "Matthew" in "input[name='firstname']" element
   * @example When I type "Matthew" into the "input[name='firstname']" element
   * @param  {string} key      Key(s) to send
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action completes
   */
  sendKey: function (key, selector) {
    return element(by.css(selector))
      .then(input => input.sendKeys(key));
  },

};

module.exports = [
  [
    /^(?:|I )click on (?:|the )"([^"]*)"/,
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
    /^(?:|I )hover (?:|over ) (?:|the)"([^"]*)" element/,
    Action.hover,
  ],
  [
    /^(?:|I )submit (?:|the )"([^"]*)" form/,
    Action.submit,
  ],
  [
    /^(?:|I )send key "([^"]*)" in "([^"]*)" element/,
    Action.sendKey,
  ],
  [
    /^(?:|I )type "([^"]*)" in(?:|to) (?:|the )"([^"]*)" element/,
    Action.sendKey,
  ],
];
