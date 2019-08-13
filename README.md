# Protractor Cucumber Slices

<img src="docs/assets/mashup-logo.svg" />

## Why use it?

Because testing is good, but writing your own step library is a dilly of a pickle.
Enjoy pre-sliced cucumber testing for protractor, ready to consume with no lengthy pickling.

## What is it?
**What?** A gherkin (cucumber) BDD step library for testing [Angular (ngx)](https://angular.io/) applications.

**See the [Steps](#steps) library to see what's included.**

## Simple Example

```gherkin
Feature: Login page
  Scenario: Login with valid credentials
    When I go to the homepage
    And I fill in the following:
      | Email    | person@company.com |
      | Password | notverysecurepw    |
    And I press "Login"
    Then I should see "Login successful."
    And I should be on the dashboard
    And I should see an "article" element
    And I should see "Welcome!" in the "h1" element
```

## Documentation

All documentation can be found on [cucumber-mink.js.org](http://cucumber-mink.js.org/).

## Inspired

This module is inspired by PHP [Behat/MinkExtension](https://github.com/Behat/MinkExtension).
