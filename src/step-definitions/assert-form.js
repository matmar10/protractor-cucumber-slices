'use strict';

const Promise = require('bluebird');
const { expect } = require('chai');
const { browser, element, by, ExpectedConditions } = require('protractor');
const EC = ExpectedConditions;

function isChecked(expected) {
  return function (selector) {
    return element(by.css(selector)).getAttribute('checked')
      .then((isChecked) => {
        expect(isChecked).to.equal(expected);
      });
  };
}

function isDisabled(expected) {
  return function (selector) {
    return element(by.css(selector)).getAttribute('disabled')
      .then((isDisabled) => {
        expect(isDisabled).to.equal(expected);
      });
  };
}

/**
 * @module AssertForm
 */
const AssertForm = {

  /**
   * Assert the currently selected option of a select field contains provided text.
   *
   * /^the "([^"]*)" current option contain "([^"]*)"$/
   *
   * @example Then the "select[name='country']" current option contain "USA"
   * @param  {string} selector Selector of target element
   * @param  {string} expected Text content of the expected selected option
   * @return {Promise}         Resolves if assertion passes
   */
  'select value': function (selector, expected) {
    const select = element.all(by.name(selector), by.binding(selector), by.css(selector));
    return select.then(listOfSelectInputs => Promise.each(listOfSelectInputs, (selectInput) => {
      const option = selectInput.element(`option[value]="${selectInput.value}"`);
      browser.wait(EC.textToBePresentInElement(option, expected), 200);
    }));
  },

  /**
   * Assert if the input’s value of given selector contains provided text.
   *
   * /^the "([^"]*)" field should contain "([^"]*)"$/
   *
   * @example Then the "textarea[name='description']" field should contain "My text"
   * @param  {string} selector Selector of target element
   * @param  {string} expected Text content of the expected value
   * @return {Promise}         Resolves if assertion passes
   */
  'input value': function (selector, expected) {
    const field = element.all(by.name(selector), by.binding(selector), by.css(selector));
    return field.then(listOfFields => Promise.each(listOfFields, (fieldInput) => {
      expect(fieldInput.value).to.contain(expected);
    }));
  },

  /**
   * Assert if the input’s value of given selector do not contains provided text.
   *
   * /^the "([^"]*)" field should not contain "([^"]*)"$/
   *
   * @example Then the "textarea[name='description']" field should not contain "My first name"
   * @param  {string} selector Selector of target element
   * @param  {string} expected Text content of the value to check does not exist
   * @return {Promise}         Resolves if assertion passes
   */
  'input not value': function (selector, expected) {
    const field = element.all(by.name(selector), by.binding(selector), by.css(selector));
    return field.then(listOfFields => Promise.each(listOfFields, (fieldInput) => {
      expect(fieldInput.value).to.not.contain(expected);
    }));
  },

  /**
   * Assert that the element matching given selector is enabled
   *
   * /the "([^"]*)" (?:field|element) should be enabled$/
   *
   * @example Then the "input[type='submit']" element should be enabled
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'input enabled': isDisabled(false),

  /**
   * Assert that the element matching given selector is disabled
   *
   * /the "([^"]*)" (?:field|element) should be disabled/
   *
   * @example Then the "input[type='submit']" element should be disabled
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'input disabled': isDisabled(true),

  /**
   * Assert that the element matching given selector is checked
   *
   * /the "([^"]*)" checkbox should be checked$/
   *
   * /the checkbox "([^"]*)" (?:is|should be) checked$/
   *
   * @example Then the "input[name='agree']" checkbox should be checked
   * @example Then the checkbox "input[name='agree']" should be checked
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'checkbox checked': isChecked(true),

  /**
   * Assert that the element matching given selector is unchecked
   *
   * /the "([^"]*)" checkbox should not be checked$/
   *
   * /the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/
   *
   * /the checkbox "([^"]*)" is (?:unchecked|not checked)$/
   *
   * @example Then the "#checkbox-input" checkbox should not be checked
   * @example Then the checkbox "#checkbox-input" should not be checked
   * @example Then the checkbox "#checkbox-input" is unchecked
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'checkbox unchecked': isChecked(false),

};

module.exports = [
  [
    /the "([^"]*)" current option contain "([^"]*)"/,
    AssertForm['select value'],
  ],
  [
    /the "([^"]*)" field should contain "([^"]*)"/,
    AssertForm['input value'],
  ],
  [
    /the "([^"]*)" field should not contain "([^"]*)"/,
    AssertForm['input not value'],
  ],
  [
    /the "([^"]*)" (?:field|element) should be enabled$/,
    AssertForm['input enabled'],
  ],
  [
    /the "([^"]*)" (?:field|element) should be disabled$/,
    AssertForm['input disabled'],
  ],
  [
    /the "([^"]*)" checkbox should be checked$/,
    AssertForm['checkbox checked'],
  ],
  [
    /the checkbox "([^"]*)" (?:is|should be) checked$/,
    AssertForm['checkbox checked'],
  ],
  [
    /the "([^"]*)" checkbox should not be checked$/,
    AssertForm['checkbox unchecked'],
  ],
  [
    /the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/,
    AssertForm['checkbox unchecked'],,
  ],
  [
    /the checkbox "([^"]*)" is (?:unchecked|not checked)$/,
    AssertForm['checkbox unchecked'],
  ],
];
