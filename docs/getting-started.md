
# Getting Started

## Install

```javascript
npm install --save-dev cucumber protractor-cucumber-slices
```

## Configure protractor.conf.js

```javascript
exports.config = {

  // change if you use a different base URL
  // this will effect set the baseUrl used in Navigation step library
  // NOTE: the BASE_URL env variable is updated by the 'base url' action
  baseUrl: process.env.BASE_URL || 'http://locahost:4200/',

  capabilities: {
    browserName:'chrome'
  },

  // this wires together protractor and cucumber
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-slices'),

  // require feature files
  specs: [
    './e2e/features/**/*.feature'
  ],

  cucumberOpts: {
    require: [
      // include this step library
      path.resolve(process.cwd(), './node_modules/protractor-cucumber-mink'),
      // point this to wherever your own steps live
      path.resolve(process.cwd(), './e2e/**/*.steps.js'),
    ],
  },
  // https://github.com/angular/protractor/issues/4378
  directConnect: true,
};
```

## Write Tests

You should be able to just start writing tests.
No "world" files need to be defined, and no custom steps need to be written!

```
# Under e2e/login/email-password.feature
Feature: Login page

  Scenario: Attempt login without entering email or password
    When I browse "${baseUrl}"
    And I press "Login"
    Then I should see "Email is required"
    And I should see "Password is required"
    And I should be on "/login"

  Scenario: Login with valid email password
    When I browse "${baseUrl}"
    And I fill in the following:
      | Email    | person@company.com |
      | Password | somepassword       |                                                  |
    And I press "Login"
    Then I should see toaster message "Login successful."
    And I should be on the homepage
```
