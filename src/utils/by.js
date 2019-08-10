'use strict';

/* global document */

/**
 * @module by
 */
module.exports = {

  /**
   * Finds element by the angular reflected name
   * @example const { by, element } = require('protractor-cucumber-mink');
   * const { When } = require('cucumber');
   * When('I click the input with reflected name "{string}"', function (selector) {
   *   return element(by.reflectedName(selector)).click();
   * });
   * @param  {Array} args                   Arguments passed to this Locator
   * @param  {Element} opt_parentElement    (optional) Parent element [default=document]
   * @return {NodeList}                     Array of matched DOM elements
   */
  reflectedName: function (args, opt_parentElement) {
    const [reflectedName] = args;
    const using = opt_parentElement || document;
    return using.querySelectorAll(`[ng-reflect-name="${reflectedName}"]`);
  },

  /**
   * Finds elements corresponding to their labels by the text itself
   * @example const { by } = require('protractor-cucumber-mink');
   * const { When } = require('cucumber');
   * When('I click the input labeled "{string}"', function (labelText) {
   *   return element(by.inputByLabelText(labelText)).click();
   * });
   * @param  {Array} args                   Arguments passed to this Locator
   * @param  {Element} opt_parentElement    (optional) Parent element [default=document]
   * @return {NodeList}                     Array of matched DOM elements
   */
  inputByLabelText: function (args, opt_parentElement) {
    const [buttonText] = args;
    // This function will be serialized as a string and will execute in the
    // browser. The first argument is the text for the button. The second
    // argument is the parent element, if any.
    const using = opt_parentElement || document;
    const labels = using.querySelectorAll('label');
    const matches = labels.filter((label) => {
      const elementText = label.textContent || label.innerText || '';
      return -1 !== elementText.indexOf(buttonText);
    });

    const inputs = [];
    matches.forEach((label) => {
      const forId = label.getAttribute('for');
      if (!forId) {
        return;
      }
      const input = document.getElementById(forId);
      if (!input) {
        return;
      }
      inputs.push(input);
    });

    return inputs;
  },
};
