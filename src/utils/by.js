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
   * @param  {Array} args                            Arguments passed to this Locator
   * @param  {Element} [opt_parentElement=document]  Parent element
   * @return {NodeList}                              Array of matched DOM elements
   */
  reflectedName: function (args, opt_parentElement) {
    /* eslint no-var: 0 */
    var [reflectedName] = args;
    var using = opt_parentElement || document;
    return using.querySelectorAll(`[ng-reflect-name="${reflectedName}"]`);
  },

  /**
   * Finds elements corresponding to their labels by the text itself
   * @example const { by } = require('protractor-cucumber-mink');
   * const { When } = require('cucumber');
   * When('I click the input labeled "{string}"', function (labelText) {
   *   return element(by.inputLabelText(labelText)).click();
   * });
   * @param  {Array} args                            Arguments passed to this Locator
   * @param  {Element} [opt_parentElement=document]  Parent element
   * @return {NodeList}                              Array of matched DOM elements
   */
  inputLabelText: function (args, opt_parentElement) {
    /* eslint no-var: 0 */
    var [buttonText] = args;
    // This function will be serialized as a string and will execute in the
    // browser. The first argument is the text for the button. The second
    // argument is the parent element, if any.
    var using = opt_parentElement || document;
    var labels = using.getElementsByTagName('label');
    var matches = [];
    for (var i = 0; i < labels.length; i++) {
      var labelElement = labels[i];
      var elementText = labelElement.textContent || labelElement.innerText || '';
      if (-1 === elementText.indexOf(buttonText)) {
        continue;
      }
      matches.push(labelElement);
    }

    var inputs = [];
    matches.forEach((label) => {
      var forId = label.getAttribute('for');
      if (!forId) {
        return;
      }
      var input = document.getElementById(forId);
      if (!input) {
        return;
      }
      inputs.push(input);
    });

    return inputs;
  },
};
