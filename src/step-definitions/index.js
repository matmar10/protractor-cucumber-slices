'use strict';

const action = require('./action.js');
const assertDOM = require('./assert-dom.js');
// const assertForm = require('./assert-form.js');
// const assertURL = require('./assert-url.js');
// const form = require('./form.js');
// const navigation = require('./navigation.js');
// const utility = require('./utility.js');

/**
 * Interface
 */

module.exports = [
  ...action,
  ...assertDOM,
  // ...assertForm,
  // ...assertURL,
  // ...form,
  // ...navigation,
  // ...utility,
];
