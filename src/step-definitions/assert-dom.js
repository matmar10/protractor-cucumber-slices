'use strict';

const { browser, element, by, ExpectedConditions } = require('protractor');
const { expect } = require('chai');

const EC = ExpectedConditions;

function elementInnerHTML(locator) {
  return browser.executeScript('return arguments[0].innerHTML;', element(locator));
}

/**
 * @module AssertDOM
 */
const AssertDOM = {

  /**
   * Assert page sources (with tags) contains the provided string.
   * /^(?:|I )should see "([^"]*)"$/
   * @example Then I should see "Home Page"
   * @param  {string} expected The text content expected to be present
   * @return {Promise}         Resolves if assertion passes
   */
  seeText: function (expected) {
    return elementInnerHTML(by.tagName('body'))
      .then((html) => {
        expect(html).to.contain(expected);
      });
  },

  /**
   * Assert page sources (with tags) contains the provided string.
   * /^(?:|I )should not see "([^"]*)"$/
   * @example Then I should not see "Detail Page"
   * @param  {string} expected The text content expected to be present
   * @return {Promise}         Resolves if assertion passes
   */
  notSeeText: function (expected) {
    return elementInnerHTML(by.tagName('body'))
      .then((html) => {
        expect(html).to.not.contain(expected);
      });
  },

  /**
   * Assert page sources (with tags) match the provided RegExp.
   * /^(?:|I ) should see text matching (.+)$/
   * @example Then I should see text matching Post-\d+
   * @param  {RegExp} regex    Regular expression
   * @return {Promise}         Resolves if assertion passes
   */
  matchText: function (regex) {
    return elementInnerHTML(by.tagName('body'))
      .then((html) => {
        expect(html).to.match(regex);
      });
  },

  /**
   * Assert page sources (with tags) do not match the provided RegExp.
   * /^(?:|I )should not see text matching (.+)$/
   * @example Then I should not see text matching .+@.+
   * @param  {RegExp} regex    Regular expression
   * @return {Promise}         Resolves if assertion passes
   */
  notMatchText: function (regex) {
    return elementInnerHTML(by.tagName('body'))
      .then((html) => {
        expect(html).to.not.match(regex);
      });
  },

  /**
   * Assert DOM-element with the provided CSS Selector contains the provided text.
   * /^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/
   * @example Then I should see "Home Page" in the "h1" element
   * @param  {string} expected Regular expression
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  elementContainsText: function (expected, selector) {
    return element(by.css(selector)).getText()
      .then((text) => {
        expect(text).to.contain(expected);
      });
  },

  /**
   * Assert DOM-element(s) with the provided CSS Selector do not contains the provided text.
   * /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/
   * @example Then I should not see "Post Detail Page" in the "h1" element
   * @param  {string} expected Regular expression
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  elementNotContainsText: function (expected, selector) {
    return element(by.css(selector)).getText()
      .then((text) => {
        expect(text).to.not.contain(expected);
      });
  },

  /**
   * Assert page contains n number of number of DOM-elements with the provided CSS Selector.
   * /^(?:|I )should see (\d+) "([^"]*)" elements?$/
   * @example Then I should see 3 "section.post" elements
   * @param  {string} expected The expected count
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  elementsCount: function (expected, selector) {
    return element.all(by.css(selector))
      .then((items) => {
        expect(items).length.to.equal(expected);
      });
  },

  /**
   * Assert page contains {n} number of DOM-elements with the provided CSS Selector.
   * /^(?:|I )should see (\d+) "([^"]*)" elements?$/
   * @example Then I should see 3 "section.post" elements
   * @param  {string} expected The text content expected to be present
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  elementTextContainsText: function (expected, selector) {
    return element(by.css(selector))
      .getText().then((text) => {
        expect(text).to.contain(expected);
      });
  },

  /**
   * Assert DOM-element(s) with the provided CSS Selector does not contain the provided text.
   * /^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/
   * @example Then I should see "Home Page" in the "h1" element
   * @param  {string} expected The text content expected to be present
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  elementTextNotContainsText: function (expected, selector) {
    return element(by.css(selector)).getText().then((text) => {
      expect(text).to.not.contain(expected);
    });
  },

  /**
   * Assert if the selected DOM-element found by given selector is visible.
   * /^I should see an? "([^"]*)" element$/
   * @example Then I should see an "h2.content-subhead" element
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  isVisible: function (selector) {
    return browser.wait(EC.visibilityOf(element(by.css(selector))), 100);
  },

  /**
   * Assert if the selected DOM-element found by given selector is not visible.
   * /^I should not see an? "([^"]*)" element$/
   * @example Then I should not see an "h2.content-subhead" element
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  isNotVisible: function (selector) {
    return browser.wait(EC.invisibilityOf(element(by.css(selector))), 100);
  },

  /**
   * Assert that at least one element exits matching given selector.
   * /^the "([^"]*)" element should exist$/
   * @example Then the "h2.content-subhead" element should exist
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  isExisting: function (selector) {
    return browser.wait(EC.presenceOf(element(by.css(selector))), 100);
  },

  /**
   * Assert that no element exists matching given selector.
   * /^the "([^"]*)" element should exist$/
   * @example Then the "h2.content-subhead" element should not exist
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  isNotExisting: function (selector) {
    return browser.wait(EC.stalenessOf(element(by.css(selector))), 100);
  },
};

/* eslint array-element-newline: ["error", "always"] */
module.exports = [
  [
    /^(?:|I )should see "([^"]*)"$/,
    AssertDOM.seeText,
  ],
  [
    /^(?:|I )should not see "([^"]*)"$/,
    AssertDOM.notSeeText,
  ],
  [
    /^(?:|I )should see text matching (.+)$/,
    AssertDOM.matchText,
  ],
  [
    /^(?:|I )should not see text matching (.+)$/,
    AssertDOM.notMatchText,
  ],
  [
    /^(?:|I )should see (\d+) "([^"]*)" elements?$/,
    AssertDOM.elementsCount,
  ],
  [
    /^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/,
    AssertDOM.elementContainsText,
  ],
  [
    /^(?:|I )should see "([^"]*)" in the "([^"]*)" element text$/,
    AssertDOM.elementTextContainsText,
  ],
  [
    /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/,
    AssertDOM.elementNotContainsText,
  ],
  [
    /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element text$/,
    AssertDOM.elementTextNotContainsText,
  ],
  [
    /^(?:|I )should see an? "([^"]*)" element$/,
    AssertDOM.isVisible,
  ],
  [
    /^(?:|I )should not see an? "([^"]*)" element$/,
    AssertDOM.isNotVisible,
  ],
  [
    /the "([^"]*)" element should be visible$/,
    AssertDOM.isVisible,
  ],
  [
    /the "([^"]*)" element should not be visible$/,
    AssertDOM.isNotVisible,
  ],
  [
    /the "([^"]*)" element should exist$/,
    AssertDOM.isExisting,
  ],
  [
    /the "([^"]*)" element should not exist$/,
    AssertDOM.isNotExisting,
  ],
];
