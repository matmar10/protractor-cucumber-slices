'use strict';

const Promise = require('bluebird');
const { expect } = require('chai');
const { browser, element, by, ExpectedConditions } = require('protractor');
const EC = ExpectedConditions;

const currentOption = function (selector, expected) {
  const select = element.all(by.name(selector), by.binding(selector), by.css(selector));
  return select.then(listOfSelectInputs => Promise.each(listOfSelectInputs, (selectInput) => {
    const option = selectInput.element(`option[value]="${selectInput.value}"`);
    browser.wait(EC.textToBePresentInElement(option, expected), 200);
  }));
};

const fieldContains = function (selector, expected) {
  const field = element.all(by.name(selector), by.binding(selector), by.css(selector));
  return field.then(listOfFields => Promise.each(listOfFields, (fieldInput) => {
    expect(fieldInput.value).to.contain(expected);
  }));
};

const fieldNotContains = function (selector, expected) {
  const field = element.all(by.name(selector), by.binding(selector), by.css(selector));
  return field.then(listOfFields => Promise.each(listOfFields, (fieldInput) => {
    expect(fieldInput.value).to.not.contain(expected);
  }));
};

module.exports = [
  [/the "([^"]*)" current option contain "([^"]*)"/, currentOption],
  [/the "([^"]*)" field should contain "([^"]*)"/, fieldContains],
  [/the "([^"]*)" field should not contain "([^"]*)"/, fieldNotContains],
];
