'use strict';

const Promise = require('bluebird');
const { browser, element, by, ExpectedConditions } = require('protractor');
const { expect } = require('chai');

const { any } = require('./../utils/by');

const EC = ExpectedConditions;

function elementInnerHTML(locator) {
  return browser.executeScript('return arguments[0].innerHTML;', element(locator));
}

/**
 * @module AssertDOM
 */
const AssertDOM = {

  regex: {
    'html contains': [/^(?:|I )should see "([^"]*)"$/],
    'html not contains': [/^(?:|I )should not see "([^"]*)"$/],
    'html match': [/^(?:|I )should see text matching (.+)$/],
    'html not match': [/^(?:|I )should not see text matching (.+)$/],
    'html element count': [/^(?:|I )should see (\d+) "([^"]*)" elements?$/],
    'element contains': [
      /^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/,
      /^(?:|I )should see "([^"]*)" in the "([^"]*)" element text$/,
    ],
    'element not contains': [
      /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/,
      /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element text$/,
    ],
    'element visible': [
      /^(?:|I )should see (?:|the |a |an )"([^"]*)" element$/,
      /^(?:|the |a |an )"([^"]*)" element should be visible$/,
    ],
    'element not visible': [
      /^(?:|I )should not see (?:|the |a |an )"([^"]*)" element$/,
      /(?:|the |a |an )"([^"]*)" element should not be visible$/,
    ],
    'element exists': [
      /the "([^"]*)" element should exist$/,
      /there should be an? "([^"]*)" element$/,
    ],
    'element not exists': [
      /the "([^"]*)" element should not exist$/,
      /there should not be an? "([^"]*)" element$/,
    ],
    'link visible': [
      /^I should see an? "([^"]*)" link/,
      /^the "([^"]*)" link should be visible/,
    ],
    'link not visible': [
      /^I should see not an? "([^"]*)" link/,
      /^the "([^"]*)" link should not be visible/,
    ],
  },

  /**
   * Assert page sources (with tags) contains the provided string.
   *
   * #### Patterns
   *
   * - /^(?:|I )should see "([^"]*)"$/
   *
   * @example Then I should see "Home Page"
   * @param  {string} expected The text content expected to be present
   * @return {Promise}         Resolves if assertion passes
   */
  'html contains': function (expected) {
    return elementInnerHTML(by.tagName('body'))
      .then((html) => {
        expect(html).to.contain(expected);
      });
  },

  /**
   * Assert page sources (with tags) contains the provided string.
   *
   * #### Patterns
   *
   * - /^(?:|I )should not see "([^"]*)"$/
   *
   * @example Then I should not see "Detail Page"
   * @param  {string} expected The text content expected to be present
   * @return {Promise}         Resolves if assertion passes
   */
  'html not contains': function (expected) {
    return elementInnerHTML(by.tagName('body'))
      .then((html) => {
        expect(html).to.not.contain(expected);
      });
  },

  /**
   * Assert page sources (with tags) match the provided RegExp.
   *
   * #### Patterns
   *
   * - /^(?:|I ) should see text matching (.+)$/
   *
   * @example Then I should see text matching Post-\d+
   * @param  {RegExp} regex    Regular expression
   * @return {Promise}         Resolves if assertion passes
   */
  'html match': function (regex) {
    return elementInnerHTML(by.tagName('body'))
      .then((html) => {
        expect(html).to.match(regex);
      });
  },

  /**
   * Assert page sources (with tags) do not match the provided RegExp.
   *
   * #### Patterns
   *
   * - /^(?:|I )should not see text matching (.+)$/
   *
   * @example Then I should not see text matching .+@.+
   * @param  {RegExp} regex    Regular expression
   * @return {Promise}         Resolves if assertion passes
   */
  'html not match': function (regex) {
    return elementInnerHTML(by.tagName('body'))
      .then((html) => {
        expect(html).to.not.match(regex);
      });
  },

  /**
   * Assert page contains n number of number of DOM-elements with the provided CSS Selector.
   *
   * #### Patterns
   *
   * - /^(?:|I )should see (\d+) "([^"]*)" elements?$/
   *
   * @example Then I should see 3 "section.post" elements
   * @param  {integer} expected The expected count
   * @param  {string} selector  Selector of target element
   * @return {Promise}          Resolves if assertion passes
   */
  'html element count': function (expected, selector) {
    return element.all(by.css(selector))
      .then((items) => {
        expect(items).length.to.equal(expected);
      });
  },

  /**
   * Assert DOM-element with the provided CSS Selector contains the provided text.
   *
   * #### Patterns
   *
   * - /^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/
   * - /^(?:|I )should see "([^"]*)" in the "([^"]*)" element(?:|'s) text$/
   *
   * @example Then I should see "Home Page" in the "h1" element
   * @example Then I should see "Login" in the "h1" element text
   * @example Then I should see "Login" in the "h1" element's text
   * @param  {string} expected Regular expression
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'element contains': function (expected, selector) {
    return element.all(by.css(selector))
      .then(list => Promise.each(list, item => item.getText().then((text) => {
        expect(text).to.contain(expected);
      })));
  },

  /**
   * Assert DOM-element(s) with the provided CSS Selector do not contains the provided text.
   *
   * #### Patterns
   *
   * - /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/
   * - /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element text$/,
   *
   * @example Then I should not see "Post Detail Page" in the "h1" element
   * @example Then I should not see "Register" in the "h1" element text
   * @param  {string} expected Regular expression
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'element not contains': function (expected, selector) {
    return element.all(by.css(selector))
      .then(list => Promise.each(list, item => item.getText().then((text) => {
        expect(text).to.not.contain(expected);
      })));
  },

  /**
   * Assert if the selected DOM-element found by given selector is visible.
   *
   * #### Patterns
   *
   * - /^(?:|I )should see (?:|the |a |an )"([^"]*)" element$/
   * - /(?:|the |a |an )"([^"]*)" element should be visible$/
   *
   * @example Then I should see an "h2.content-subhead" element
   * @example Then the ".alert.alert-danger" element should be visible
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'element visible': function (selector) {
    return browser.wait(EC.visibilityOf(element(by.css(selector))), 100);
  },

  /**
   * Assert if the selected DOM-element found by given selector is not visible.
   *
   * #### Patterns
   *
   * - /^(?:|I )should not see (?:|the |a |an )"([^"]*)" element$/
   * - /(?:|the |a |an )"([^"]*)" element should not be visible$/
   *
   * @example Then I should not see an "h2.content-subhead" element
   * @example Then the ".alert.alert-danger" element should not visible
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'element not visible': function (selector) {
    return browser.wait(EC.invisibilityOf(element(by.css(selector))), 100);
  },

  /**
   * Assert that at least one element exits matching given selector.
   *
   * #### Patterns
   *
   * - /^the "([^"]*)" element should exist$/
   * - /there should be an? "([^"]*)" element$/
   *
   * @example Then the "h2.content-subhead" element should exist
   * @example Then there should be a "span.warning" element
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'element exists': function (selector) {
    return browser.wait(EC.presenceOf(element(by.css(selector))), 100);
  },

  /**
   * Assert that no element exists matching given selector.
   *
   * #### Patterns
   *
   * - /^the "([^"]*)" element should exist$/
   * - /there should not be an? "([^"]*)" element$/
   *
   * @example Then the "h2.content-subhead" element should not exist
   * @example Then there should not be a "button" element
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves when action completes
   */
  'element not exists': function (selector) {
    return browser.wait(EC.stalenessOf(element(by.css(selector))), 100);
  },

  /**
   * Assert the visibility of a link (or button) with at least partial match of text
   *
   * #### Patterns
   * - /^(?:|I )should see an? "([^"]*)" link/
   * - /^the "([^"]*)" link should be visible/
   *
   * @example Then I should see a "See more examples" link
   * @example Then the "Click to resend" link should be visible
   * @param  {string} text Text to find the link
   * @return {Promise}         Resolves if assertion passes
   */
  'link visible': function (text) {
    return any(by.partialButtonText(text), by.partialLinkText(text))
      .then(link => browser.wait(EC.visibilityOf(link), 1000));
  },

  /**
   * Assert the presence of a link with at least partial match of text
   *
   * #### Patterns
   * - /^(?:|I )should not see an? "([^"]*)" link/
   * - /^the "([^"]*)" link should not be visible/
   *
   * @example Then I should not see a "See more examples" link
   * @example Then the "Click to resend" link should not be visible
   * @param  {string} text Text to find the link
   * @return {Promise}         Resolves if assertion passes
   */
  'link not visible': function (text) {
    return any(by.partialButtonText(text), by.partialLinkText(text))
      .then(link => browser.wait(EC.invisibilityOf(link), 1000));
  },
};

module.exports = AssertDOM;
