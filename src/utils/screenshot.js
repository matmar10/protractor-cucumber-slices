'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const { browser } = require('protractor');

let totalScreenshots = 0;
let path;

function writeScreenShot(data, filename) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filename);
    stream.on('finish', () => {
      resolve();
    });
    stream.on('error', reject);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  });
}

const Screenshot = {
  count: function (newCount) {
    if (newCount || 0 === newCount) {
      totalScreenshots = newCount;
    }
    return totalScreenshots;
  },
  path: function () {
    if (path) {
      return Promise.resolve(path);
    }
    return browser.getProcessedConfig()
      .then((config) => {
        if (!config.screenshotPath) {
          throw new Error('No screenshotPath configured. You should add this to protractor.config.js');
        }
        path = config.screenshotPath;
        return path;
      });
  },
  takeScreenshot: function () {
    return Screenshot.path()
      .then(path => browser.takeScreenshot()
        .then(imageData => writeScreenShot(imageData, `${path}/screenshot-${++totalScreenshots}.png`)));
  },
};

module.exports = Screenshot;
