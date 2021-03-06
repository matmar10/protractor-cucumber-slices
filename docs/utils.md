<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [by][1]
    -   [reflectedName][2]
    -   [inputLabelText][3]
-   [url][4]
    -   [isAbsolute][5]
    -   [parseWithEnv][6]
    -   [base][7]
    -   [getCurrent][8]
    -   [alias][9]
    -   [browserGetWithTimeout][10]
-   [element][11]
    -   [any][12]
    -   [input][13]

## by

### reflectedName

Finds element by the angular reflected name

#### Parameters

-   `args` **[Array][14]** Arguments passed to this Locator
-   `opt_parentElement` **[Element][15]** Parent element (optional, default `document`)

#### Examples

```javascript
const { by, element } = require('protractor-cucumber-slices');
const { When } = require('cucumber');
When('I click the input with reflected name "{string}"', function (selector) {
  return element(by.reflectedName(selector)).click();
});
```

Returns **[NodeList][16]** Array of matched DOM elements

### inputLabelText

Finds elements corresponding to their labels by the text itself

#### Parameters

-   `args` **[Array][14]** Arguments passed to this Locator
-   `opt_parentElement` **[Element][15]** Parent element (optional, default `document`)

#### Examples

```javascript
const { by } = require('protractor-cucumber-slices');
const { When } = require('cucumber');
When('I click the input labeled "{string}"', function (labelText) {
  return element(by.inputLabelText(labelText)).click();
});
```

Returns **[NodeList][16]** Array of matched DOM elements

## url

### isAbsolute

Check whether given location is an absolute URL

#### Parameters

-   `location` **[string][17]** URL to check

Returns **[boolean][18]** Whether is absolute (or not)

### parseWithEnv

Replace all template variables with configured URL aliases
URL returns unaltered if there are no template variables inside

#### Parameters

-   `location` **[string][17]** The URL

Returns **[string][17]** URL with replacements made

### base

Get/set a base URL for all subsequent tests
Defaults to the `baseUrl` parameter in protractor config

#### Parameters

-   `newBaseUrl` **[string][17]** Optional new base URL to set (optional, default `false`)

Returns **[string][17]** The current base URL

### getCurrent

Get the current browser URL, optionall ignoring the configured base url

#### Parameters

-   `excludeBase` **[Boolean][18]** Whether to exclude base URL (optional, default `true`)

Returns **[string][17]** The current URL

### alias

Get/set an URL alias which can be used in templates with `${name}` syntax

#### Parameters

-   `alias` **[string][17]** Alias of URL to get/set
-   `url` **[string][17]** New URL to set for the alias (optional, default `null`)

#### Examples

```javascript
const { url } = require('protractor-cucumber-slices');
url.alias('login', '/user/auth/login');

Scenario: Visit login page
  When I browse "${login}"
  And I press "Login"
  Then I should see "Email is required"
  And I should see "Password is required"
```

Returns **[string][17]** Returns the URL set for this alias

### browserGetWithTimeout

Fetch the given URL, using the timeout (if provided).
Defaults to the protractor getPageTimeout

#### Parameters

-   `url` **[string][17]** The URL to load
-   `timeout` **[number][19]?** (optional) Timeout in milliseconds

Returns **[Promise][20]** Resolves when the page is loaded

## element

### any

Attempts to find a single element by trying each of the provided
Locators in the order provided.

#### Parameters

-   `finders` **...webdriver.Locator** List of Locators to check

#### Examples

```javascript
const { by } = require('protractor');
const { element } = require('protractor-cucumber-slices');
const { When } = require('cucumber');
When('I click the {string} input', function (selector) {
  return element.any(by.css('.alert'), by.name('alert'), by.binding('messages.alert')).click();
});
```

Returns **[Promise][20]&lt;ElementFinder>** The ElementFinder for the first matched element

### input

Attempts to find a single input element using the following methods:
1\. By CSS selector (by.css)
2\. By name (by.name)
3\. By angular model (by.selector)
4\. By angular reflected name (by.reflectedName)
4\. By input label text to get ID (by.inputLabelText)
5\. By angular binding (by.binding)

#### Parameters

-   `selector` **[string][17]** Query to look up using each of the available methods

#### Examples

```javascript
const { element } = require('protractor-cucumber-slices');
const { When } = require('cucumber');
When('I click the {string} input', function (selector) {
  return element.input(selector)
   .then(function(input) {
     return input.click();
   });
});
```

Returns **[Promise][20]&lt;ElementFinder>** The ElementFinder

[1]: #by

[2]: #reflectedname

[3]: #inputlabeltext

[4]: #url

[5]: #isabsolute

[6]: #parsewithenv

[7]: #base

[8]: #getcurrent

[9]: #alias

[10]: #browsergetwithtimeout

[11]: #element

[12]: #any

[13]: #input

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[15]: https://developer.mozilla.org/docs/Web/API/Element

[16]: https://developer.mozilla.org/docs/Web/API/NodeList

[17]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[18]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[19]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
