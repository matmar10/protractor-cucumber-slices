'use strict';

const { browser, element, by } = require('protractor');

const { any } = require('./../utils/element');
const Errors = require('./../utils/errors');

/**
 * @module Action
 */
const Action = {

  regex: {
    click: [
      /^(?:|I )click on (?:|the )"([^"]*)"/,
    ],
    press: [
      /^(?:|I )press "([^"]*)"/,
      /^(?:|I )click (?:|on )(?:|the )"([^"]*)" link/,
    ],
    follow: [/^(?:|I )follow "([^"]*)"/],
    hover: [/^(?:|I )hover (?:|over ) (?:|the)"([^"]*)" element/],
    submit: [/^(?:|I )submit (?:|the )"([^"]*)" form/],
    sendKey: [
      /^(?:|I )send key "([^"]*)" in "([^"]*)" element/,
      /^(?:|I )type "([^"]*)" in(?:|to) (?:|the )"([^"]*)" element/,
    ],
  },

  /**
   * Click on an element based on given selector.
   * If you want to click a button, use `press` instead.
   *
   * #### Patterns
   *
   * - /^(?:|I )click on (?:|the )"([^"]*)"/
   *
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
   * #### Patterns
   *
   * - /^(?:|I )hover (?:|over ) (?:|the)"([^"]*)" element/
   *
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
   * #### Patterns
   *
   * - /^(?:|I )submit (?:|the )"([^"]*)" form/
   *
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
   *
   *   1. CSS Selector
   *   2. Partial text of button and input (of type="submit") elements
   *   3. Partial text of link elements
   *
   * #### Patterns
   *
   * - /^(?:|I )press "([^"]*)"/
   * - /^(?:|I )click (?:|on )(?:|the )"([^"]*)" link/
   *
   * @example When I press "button.register"
   * And I press "Register"
   * And I press "Submit"
   * @example When I click on the "Login" link
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves after action completes
   */
  press: function (selector) {
    return any(by.buttonText(selector), by.partialButtonText(selector), by.linkText(selector), by.partialLinkText(selector))
      .then(button => button.click());
  },

  /**
   * Follow a link element with string argument interpreted as (in order):
   *
   * 1. CSS Selector
   * 3. Partial text of link elements
   *
   * #### Patterns
   *
   * - /^(?:|I )follow "([^"]*)"/
   *
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
   * #### Patterns
   *
   * - /^(?:|I )send key "([^"]*)" in "([^"]*)" element/
   * - /^(?:|I )type "([^"]*)" in(?:|to) (?:|the )"([^"]*)" element/
   *
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

module.exports = Action;
