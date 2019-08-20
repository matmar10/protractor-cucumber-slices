'use strict';

const { expect } = require('chai');
const { element, by, ExpectedConditions } = require('protractor');

const { input } = require('./../utils/element');
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

  regex: {
    'select value': [
      /the "([^"]*)" current option contain "([^"]*)"/,
    ],
    'input value': [
      /the "([^"]*)" field should contain "([^"]*)"/,
    ],
    'input not value': [
      /the "([^"]*)" field should not contain "([^"]*)"/,
    ],
    'input enabled': [
      /the "([^"]*)" (?:field|element) should be enabled$/,
    ],
    'input disabled': [
      /the "([^"]*)" (?:field|element) should be disabled$/,
    ],
    'checkbox checked': [
      /the "([^"]*)" checkbox should be checked$/,
      /the checkbox "([^"]*)" (?:is|should be) checked$/,
    ],
    'checkbox unchecked': [
      /the "([^"]*)" checkbox should not be checked$/,
      /the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/,
      /the checkbox "([^"]*)" is (?:unchecked|not checked)$/,
    ],
  },

  /**
   * Assert the currently selected option of a select field contains provided text.
   *
   * #### Patterns
   *
   * - /^the "([^"]*)" current option contain "([^"]*)"$/
   *
   * @example Then the "select[name='country']" current option contain "USA"
   * @param  {string} selector Selector of target element
   * @param  {string} expected Text content of the expected selected option
   * @return {Promise}         Resolves if assertion passes
   */
  'select value': function (selector, expected) {
    return input(selector)
      .then((selectInput) => {
        const option = selectInput.element(`option[value]="${selectInput.value}"`);
        return EC.textToBePresentInElement(option, expected)();
      });
  },

  /**
   * Assert if the input’s value of given selector contains provided text.
   *
   * #### Patterns
   *
   * - /^the "([^"]*)" field should contain "([^"]*)"$/
   *
   * @example Then the "textarea[name='description']" field should contain "My text"
   * @param  {string} selector Selector of target element
   * @param  {string} expected Text content of the expected value
   * @return {Promise}         Resolves if assertion passes
   */
  'input value': function (selector, expected) {
    return input(selector)
      .then((fieldInput) => {
        expect(fieldInput.value).to.contain(expected);
      });
  },

  /**
   * Assert if the input’s value of given selector do not contains provided text.
   *
   * #### Patterns
   *
   * - /^the "([^"]*)" field should not contain "([^"]*)"$/
   *
   * @example Then the "textarea[name='description']" field should not contain "My first name"
   * @param  {string} selector Selector of target element
   * @param  {string} expected Text content of the value to check does not exist
   * @return {Promise}         Resolves if assertion passes
   */
  'input not value': function (selector, expected) {
    return input(selector)
      .then((fieldInput) => {
        expect(fieldInput.value).to.not.contain(expected);
      });
  },

  /**
   * Assert that the element matching given selector is enabled
   *
   * #### Patterns
   *
   * - /the "([^"]*)" (?:field|element) should be enabled$/
   *
   * @example Then the "input[type='submit']" element should be enabled
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'input enabled': isDisabled(false),

  /**
   * Assert that the element matching given selector is disabled
   *
   * #### Patterns
   *
   * - /the "([^"]*)" (?:field|element) should be disabled/
   *
   * @example Then the "input[type='submit']" element should be disabled
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'input disabled': isDisabled(true),

  /**
   * Assert that the element matching given selector is checked
   *
   * #### Patterns
   *
   * - /the "([^"]*)" checkbox should be checked$/
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
   * #### Patterns
   *
   * - /the "([^"]*)" checkbox should not be checked$/
   * - /the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/
   * - /the checkbox "([^"]*)" is (?:unchecked|not checked)$/
   *
   * @example Then the "#checkbox-input" checkbox should not be checked
   * @example Then the checkbox "#checkbox-input" should not be checked
   * @example Then the checkbox "#checkbox-input" is unchecked
   * @param  {string} selector Selector of target element
   * @return {Promise}         Resolves if assertion passes
   */
  'checkbox unchecked': isChecked(false),

};

module.exports = AssertForm;
