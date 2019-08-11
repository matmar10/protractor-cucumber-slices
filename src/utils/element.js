'use strict';

const Promise = require('bluebird');
const { element, by } = require('protractor');

const errors = require('./errors');

/**
 * @module element
 */
module.exports = {

  /**
   * Attempts to find a single element by trying each of the provided
   * Locators in the order provided.
   * @example const { by } = require('protractor');
   * const { element } = require('protractor-cucumber-mink');
   * const { When } = require('cucumber');
   * When('I click the {string} input', function (selector) {
   *   return element.any(by.css('.alert'), by.name('alert'), by.binding('messages.alert')).click();
   * });
   * @param  {...webdriver.Locator} finders  List of Locators to check
   * @return {Promise<ElementFinder>}        The ElementFinder for the first matched element
   */
  any: function any(...finders) {
    const filtered = [];
    console.log(`Trying ${finders.length} finders...`);
    let i = 0;
    return Promise.each(finders, (finder) => {
      console.log('Trying finder #:', i++);
      const el = element(finder);
      return el.isPresent()
        .then((isPresent) => {
          if (isPresent) {
            console.log('Finder present:', String(finder));
            filtered.push(el);
          }
          console.log('Finder NOT present:', String(finder));
          return null;
        }, (err) => {
          console.log('Was error::::', err);
          return null;
        });
    })
      .then(() => {
        if (!filtered.length) {
          throw new Error(errors.LOCATOR.NOT_FOUND_FOR_LIST);
        }
        return filtered[0];
      });
  },

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
   *   return element.input(selector)
   *    .then(function(input) {
   *      return input.click();
   *    });
   * });
   * @param  {string} selector          Query to look up using each of the available methods
   * @return {Promise<ElementFinder>}   The ElementFinder
   */
  input: function (selector) {
    return module.exports.any(by.css(selector), by.name(selector), by.model(selector), by.binding(selector), by.inputLabelText(selector), by.reflectedName(selector));
  },
};
