'use strict';

const Promise = require('bluebird');
const { browser } = require('protractor');

/**
 * @module Utility
 */
const Utility = {


  /**
   * Take a screenshot of the current viewport and save it at ./screenshot.png
   *
   * /^(?:|I )take a screenshot/
   *
   * @example Then I take a screenshot
   * @param  {int} width      Desired view width
   * @param  {int} height     Desired view height
   * @return {Promise}        Resolves when action completes
   */
  'screenshot': function () {
    return browser.takeScreenshot({
      path: './screenshot.png',
    });
  },

  /**
   * Set browser viewport size, width and height in pixel. The default viewport is: { width: 1366, height: 768 } (most used screen resolution).
   *
   * /the viewport is (\d+)px width and (\d+)px height/
   *
   * @example When the viewport is 360px width and 568px height
   * @param  {int} width      Desired view width
   * @param  {int} height     Desired view height
   * @return {Promise}        Resolves when action completes
   */
  'viewport': function (width, height) {
    return browser.driver.manage().window().setSize(width, height);
  },

  /**
   * Wait for N seconds.
   *
   * /^(?:|I )wait (\d+) seconds?/
   *
   * @example Then I wait 10 seconds
   * @param  {Number} seconds Number of seconds to wait
   * @return {Promise}        Resolves when action completes
   */
  'wait': function (seconds) {
    return browser.wait(new Promise(resolve => setTimeout(() => resolve(true), seconds * 1000)), (seconds * 1000) + 1000);
  },
};

module.exports = [
  [
    /^(?:|I )take a screenshot/,
    Utility['screenshot'],
  ],
  [
    /the viewport is (\d+)px width and (\d+)px height/,
    Utility['viewport'],
  ],
  [
    /^(?:|I )wait (?:|for )(\d+) seconds?/,
    Utility['wait'],
  ],
];
