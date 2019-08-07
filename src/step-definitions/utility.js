'use strict';

const Promise = require('bluebird');
const { browser } = require('protractor');

const viewport = function (width, height) {
  return browser.driver.manage().window().setSize(width, height);
};

const wait = function (seconds) {
  return browser.wait(new Promise((resolve) => {
    setTimeout(() => resolve(true), seconds);
  }));
};

const screenshot = function () {
  return browser.takeScreenshot({
    path: './screenshot.png',
  });
};

module.exports = [
  [/^(?:|I )wait (\d+) seconds?/, wait],
  [/the viewport is (\d+)px width and (\d+)px height/, viewport],
  [/^(?:|I )take a screenshot/, screenshot],
];
