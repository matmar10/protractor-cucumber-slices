'use strict';

const Promise = require('bluebird');
const { by } = require('protractor');

const { inputElement } = require('./../utils/element-finders');

function checkInput(targetState) {
  return function (selector) {
    const field = inputElement(selector);
    return field
      .getAttribute()
      .then((isChecked) => {
        if ((isChecked && targetState) || (!isChecked && !targetState)) {
          return;
        }
        return field.click();
      });
  };
}

/**
 * @module Form
 */
const Form = {

  /**
   * Send a sequence of key strokes to an element (clears value before).
   * You can also use unicode characters like Left arrow or Back space.
   * See the [protract sendKeys method documentation](http://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.sendKeys)
   *
   * /^(?:|I )fill in "([^"]*)" with "([^"]*)"$/
   *
   * /^(?:|I )fill in "([^"]*)" with:$/
   *
   * @example Then I fill in "input[name='first_name']" with:
  """
  My long multi-line text ...
  """
   * @param  {string} selector Css selector matching the target field element
   * @param  {string} value    The text content to send
   * @return {Promise}         Resolves when the action completes
   */
  'fill field': function (selector, value) {
    return inputElement(selector).sendKeys(value);
  },

  /**
   * Send a sequence of key strokes to an element (clears value before).
   * You can also use unicode characters like Left arrow or Back space.
   * See the [protract sendKeys method documentation](http://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.sendKeys)
   *
   * /^(?:|I )fill in the following:$/
   *
   * @example When I fill in the following:
  | input[name='first_name']     | John          |
  | input[name='last_name']      | Doe           |
  | textarea[name='description'] | Some text ... |
   * @param  {object} hashDataTable List of key:value pairs of data to fieldElement
   * @return {Promise}              Resolves when the action completes
   */
  'fill multiple': function (hashDataTable) {
    /* istanbul ignore next */
    return Promise.each(hashDataTable.raw(), ([field,
      value]) => inputElement(field).sendKeys(value));
  },

  /**
   * Select option that display text matching the argument.
   *
   * /^(?:|I )select "([^"]*)" from "([^"]*)"$/
   *
   * @example Then I select "France" from "select.country"
   * @param  {string} option   Text content of the option
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves when the action completes
   */
  'choose in select': function selectFrom(option, selector) {
    return inputElement(selector)
      .then(selectField => selectField.element(by.cssContainingText('option', option))
        .click());
  },

  /**
   * Check the checkbox with provided selector.
   *
   * /^(?:|I )check "([^"]*)"$/
   *
   * @example Then I check "#checkbox-input"
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves when the action completes
   */
  'check': checkInput(true),

  /**
   * Uncheck the checkbox with provided selector.
   *
   * /^(?:|I )uncheck "([^"]*)"$/
   *
   * @example Then I uncheck "#checkbox-input-next"
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves when the action completes
   */
  'uncheck': checkInput(false),


};

module.exports = [
  [
    /^(?:|I )fill in "([^"]*)" with "([^"]*)"/,
    Form['fill field'],
  ],
  [
    /^(?:|I )fill in "([^"]*)" with:/,
    Form['fill multiple'],
  ],
  [
    /^(?:|I )fill in the following:/,
    Form['fill multiple'],
  ],
  [
    /^(?:|I )select "([^"]*)" from "([^"]*)"/,
    Form['choose in select'],
  ],
  [
    /^(?:|I )check "([^"]*)"/,
    Form['check'],
  ],
  [
    /^(?:|I )uncheck "([^"]*)"/,
    Form['uncheck'],
  ],
];
