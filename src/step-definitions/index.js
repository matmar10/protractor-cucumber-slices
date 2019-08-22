'use strict';

const modules = require('require-dir')();

module.exports = {
  action: modules['action'],
  form: modules['form'],
  navigation: modules['navigation'],
  utility: modules['utility'],
  assertDOM: modules['assert-dom'],
  assertForm: modules['assert-form'],
  assertUrl: modules['assert-url'],
};
