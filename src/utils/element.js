'use strict';

const { element, by } = require('protractor');

/**
 * @module element
 */
module.exports = {

  /**
   * Attempts to find a single input element using the following methods:
   * 1. By CSS selector (by.css)
   * 2. By name (by.name)
   * 3. By angular model (by.selector)
   * 4. By angular reflected name (by.reflectedName)
   * 4. By input label text to get ID (by.inputLabelText)
   * 5. By angular binding (by.binding)
   * @example const { element } = require('protractor-cucumber-mink');
   * const { When } = require('cucumber');
   * When('I click the {string} input', function (selector) {
   *   return element.input(selector).click();
   * });
   * @param  {string} selector The CSS selector
   * @return {ElementFinder}   The ElementFinder
   */
  input: function (selector) {
    return element.all(by.css(selector), by.name(selector), by.model(selector), by.inputLabelText(selector), by.binding(selector)).first();
  },
};
