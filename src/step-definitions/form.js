'use strict';

const Promise = require('bluebird');
const { by } = require('protractor');

const { input } = require('./../utils/element');

function checkInput(targetState) {
  return function (selector) {
    const field = input(selector);
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

  regex: {
    'fill field': [
      /^(?:|I )fill in "([^"]*)" with "([^"]*)"/,
      /^(?:|I )fill in "([^"]*)" with:/,
    ],
    'fill multiple': [
      /^(?:|I )fill in the following:/,
    ],
    'choose in select': [
      /^(?:|I )select "([^"]*)" from "([^"]*)"/,
    ],
    'check': [
      /^(?:|I )check "([^"]*)"/,
    ],
    'uncheck': [
      /^(?:|I )uncheck "([^"]*)"/,
    ],
  },

  /**
   * Send a sequence of key strokes to an element (clears value before).
   * You can also use unicode characters like Left arrow or Back space.
   * See the [protract sendKeys method documentation](http://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.sendKeys)
   *
   * #### Patterns
   *
   * - /^(?:|I )fill in "([^"]*)" with "([^"]*)"$/
   * - /^(?:|I )fill in "([^"]*)" with:$/
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
    return input(selector).then(field => field.sendKeys(value));
  },

  /**
   * Send a sequence of key strokes to an element (clears value before).
   * You can also use unicode characters like Left arrow or Back space.
   * See the [protract sendKeys method documentation](http://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.sendKeys)
   *
   * #### Patterns
   *
   * - /^(?:|I )fill in the following:$/
   *
   * @example When I fill in the following:
| "First name"                    | John          |
| "Last name"                     | Doe           |
| "textarea[name='description']"  | Some text ... |
   * @param  {object} hashDataTable List of key:value pairs of data to fieldElement
   * @return {Promise}              Resolves when the action completes
   */
  'fill multiple': function (hashDataTable) {
    let rows;
    if (Array.isArray(hashDataTable)) {
      rows = hashDataTable;
    } else if (hashDataTable.raw) {
      rows = hashDataTable.raw();
    } else {
      throw new Error('Unexpected format: hashDataTable should be an instance of Data Table Interface https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/data_table_interface.md');
    }
    return Promise.each(rows, (row) => {
      /* eslint array-element-newline: 0 */
      const [selector, value] = row;
      return input(selector).then(field => field.sendKeys(value));
    });
  },

  /**
   * Select option that display text matching the argument.
   *
   * #### Patterns
   *
   * - /^(?:|I )select "([^"]*)" from "([^"]*)"$/
   *
   * @example Then I select "France" from "select.country"
   * @param  {string} option   Text content of the option
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves when the action completes
   */
  'choose in select': function selectFrom(option, selector) {
    return input(selector)
      .then(selectField => selectField.element(by.cssContainingText('option', option))
        .click());
  },

  /**
   * Check the checkbox with provided selector.
   *
   * #### Patterns
   *
   * - /^(?:|I )check "([^"]*)"$/
   *
   * @example Then I check "#checkbox-input"
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves when the action completes
   */
  'check': checkInput(true),

  /**
   * Uncheck the checkbox with provided selector.
   *
   * #### Patterns
   *
   * - /^(?:|I )uncheck "([^"]*)"$/
   *
   * @example Then I uncheck "#checkbox-input-next"
   * @param  {string} selector Css selector matching the target field element
   * @return {Promise}         Resolves when the action completes
   */
  'uncheck': checkInput(false),


};

module.exports = Form;
