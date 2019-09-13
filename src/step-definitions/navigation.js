'use strict';

const { browser } = require('protractor');

const Errors = require('./../utils/errors');
const { base, browserGetWithTimeout, isAbsolute } = require('./../utils/url');

/**
 * @module Navigation
 */
const Navigation = {

  regex: {
    'base url': [
      /^(?:|I )browse (?:|to )"([^"]*)/,
    ],
    'homepage': [
      /^(?:|I )am on (?:|the )homepage/,
      /^(?:|I )go to (?:|the )homepage/,
      /^(?:|I )browse to (?:|the )homepage/,
    ],
    'browse': [
      /^(?:|I )am on "([^"]*)"/,
      /^(?:|I )go to "([^"]*)"/,
    ],
    'reload': [
      /^(?:|I )reload the page/,
    ],
    'back': [
      /^(?:|I )move backward one page/,
    ],
  },

  /**
   * Set driver’s baseUrl. Useful to use short path in subsequent navigation (ex: “/login”)
   *
   * #### Patterns
   *
   * - /^(?:|I )browse (?:|to )"([^"]*)"/
   *
   * @example When I browse "http://127.0.0.1:3000/
   * @param  {string} location The base URL as a full, absolute URL
   * @return {Promise}         Resolves when the action completes
   */
  'base url': function (location) {
    return base(location)
      .then((newBaseUrl) => {
        if (!isAbsolute(newBaseUrl)) {
          throw new Error(Errors.NAVIGATION.BASE_URL);
        }
        return browserGetWithTimeout(newBaseUrl);
      });
  },

  /**
   * Navigate to homepage, ie: baseUrl + ‘/’
   *
   * #### Patterns
   *
   * - /^(?:|I )am on (?:|the )homepage$/
   * - /^(?:|I )go to (?:|the )homepage/
   * - /^(?:|I )browse to (?:|the )homepage/
   *
   * @example When I am on the homepage
   * @example When I go to the homepage
   * @example When I go to homepage
   * @return {Promise} Resolves when the action completes
   */
  'homepage': function () {
    return base()
      .then(url => browserGetWithTimeout(url));
  },

  /**
   * Browse given URL or path. Protractor assumes it is an angular page
   *
   * #### Patterns
   *
   * - /^(?:|I )am on "([^"]*)"/
   * - /^(?:|I )go to "([^"]*)"/
   *
   * @example When I am on "/post/2"
   * @example When I go to "/articles/why-to-use-cucumber"
   * @param  {string} location Path to browse to, either absolute or relative
   * @return {Promise} Resolves when action completes
   */
  'browse': function (location) {
    if (isAbsolute(location)) {
      return base(location).then(() => browserGetWithTimeout(location));
    }
    return browser.setLocation(location);
  },

  /**
   * Reload the current page.
   *
   * #### Patterns
   *
   * - /^(?:|I )reload the page/
   *
   * @example When I reload the page
   * @return {Promise} Resolves when action completes
   */
  'reload': function () {
    return browser.refresh();
  },

  /**
   * Navigate backwards in the browser history, if possible.
   *
   * #### Patterns
   *
   * - /^(?:|I )move backward one page/
   *
   * @example When I move backward one page
   * @return {Promise} Resolves when action completes
   */
  'back': function () {
    return browser.navigate().back();
  },
};

module.exports = Navigation;
