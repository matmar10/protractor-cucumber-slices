'use strict';

const Promise = require('bluebird');
const { element, by } = require('protractor');

const fieldElement = function (selector) {
  return element.all(by.name(selector), by.model(selector), by.css(selector)).first();
};

const fillField = function (selector, value) {
  return fieldElement(selector).sendKeys(value);
};

const fillFieldsHash = function (hashDataTable) {
  /* istanbul ignore next */
  return Promise.each(hashDataTable.raw(), ([field,
    value]) => fieldElement(field).sendKeys(value));
};

const selectFrom = function (option, selector) {
  return fieldElement(selector)
    .then(selectField => selectField.element(by.cssContainingText('option', option))
      .click());
};

const checkInput = function (targetState) {
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
};

module.exports = [
  [
    /^(?:|I )fill in "([^"]*)" with "([^"]*)"/,
    fillField,
  ],
  [
    /^(?:|I )fill in "([^"]*)" with:/,
    fillField,
  ],
  [
    /^(?:|I )fill in the following:/,
    fillFieldsHash,
  ],
  [
    /^(?:|I )select "([^"]*)" from "([^"]*)"/,
    selectFrom,
  ],
  [
    /^(?:|I )check "([^"]*)"/,
    checkInput(true),
  ],
  [
    /^(?:|I )uncheck "([^"]*)"/,
    checkInput(false),
  ],
];
