'use strict';

const Promise = require('bluebird');
const { element, by } = require('protractor');

function fieldElement(selector) {
  return element.all(by.name(selector), by.model(selector), by.css(selector)).first();
}

function checkInput(targetState) {
  return function (selector) {
    const field = fieldElement(selector);
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
   * /^(?:|I )fill in "([^"]*)" with "([^"]*)"$/
   * /^(?:|I )fill in "([^"]*)" with:$/
   * @example Then I fill in "input[name='first_name']" with:
  """
  My long multi-line text ...
  """
   * @param  {string} selector Css selector matching the target field element
   * @param  {string} value    The text content to send
   * @return {Promise}         Resolves if assertion passes
   */
  fillField: function (selector, value) {
    return fieldElement(selector).sendKeys(value);
  },

  /**
   * Send a sequence of key strokes to an element (clears value before).
   * You can also use unicode characters like Left arrow or Back space.
   * See the [protract sendKeys method documentation](http://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.sendKeys)
   * /^(?:|I )fill in the following:$/
   * @example When I fill in the following:
  | input[name='first_name']     | John          |
  | input[name='last_name']      | Doe           |
  | textarea[name='description'] | Some text ... |
   * @param  {string} selector Css selector matching the target field element
   * @param  {string} value    The text content to send
   * @return {Promise}         Resolves if assertion passes
   */
  fillFieldsHash: function (hashDataTable) {
    /* istanbul ignore next */
    return Promise.each(hashDataTable.raw(), ([field,
      value]) => fieldElement(field).sendKeys(value));
  },

  /**
   * Select option that display text matching the argument.
   * /^(?:|I )select "([^"]*)" from "([^"]*)"$/
   * @example Then I select "France" from "select.country"
   * @param  {string} option   Text content of the option
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves if assertion passes
   */
  selectFrom: function selectFrom(option, selector) {
    return fieldElement(selector)
      .then(selectField => selectField.element(by.cssContainingText('option', option))
        .click());
  },

  /**
   * Check the checkbox with provided selector.
   * /^(?:|I )check "([^"]*)"$/
   * @example Then I check "#checkbox-input"
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves if assertion passes
   */
  setChecked: checkInput(true),

  /**
   * Uncheck the checkbox with provided selector.
   * /^(?:|I )uncheck "([^"]*)"$/
   * @example Then I uncheck "#checkbox-input-next"
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves if assertion passes
   */
  setUnchecked: checkInput(false),


};

module.exports = [
  [
    /^(?:|I )fill in "([^"]*)" with "([^"]*)"/,
    Form.fillField,
  ],
  [
    /^(?:|I )fill in "([^"]*)" with:/,
    Form.fillField,
  ],
  [
    /^(?:|I )fill in the following:/,
    Form.fillFieldsHash,
  ],
  [
    /^(?:|I )select "([^"]*)" from "([^"]*)"/,
    Form.selectFrom,
  ],
  [
    /^(?:|I )check "([^"]*)"/,
    Form.setChecked,
  ],
  [
    /^(?:|I )uncheck "([^"]*)"/,
    Form.setUnchecked,
  ],
];
