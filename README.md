# protractor-cucumber-mink

Gherkin (cucumber) BDD step library built protractor
intended for for testing [Angular](https://angular.io/) apps.

Uses [protractor-cucumber-framework](https://www.npmjs.com/package/protractor-cucumber-framework) to wire protractor to cucumber.

## Getting Started

```javascript
npm install --save-dev cucumber protractor-cucumber-framework
```

### protractor.conf.js

```javascript
exports.config = {

  // change if you use a different base URL
  // this will effect set the baseUrl used in Navigation step library
  baseUrl: 'http://locahost:4200/',

  capabilities: {
    browserName:'chrome'
  },

  // this wires together protractor and cucumber
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

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

## Steps

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Action](#action)
    -   [click](#click)
    -   [hover](#hover)
    -   [submit](#submit)
    -   [press](#press)
    -   [follow](#follow)
    -   [sendKey](#sendkey)
-   [AssertDOM](#assertdom)
    -   [html contains](#html-contains)
    -   [html not contains](#html-not-contains)
    -   [html match](#html-match)
    -   [html not match](#html-not-match)
    -   [html element count](#html-element-count)
    -   [element contains](#element-contains)
    -   [element not contains](#element-not-contains)
    -   [element visible](#element-visible)
    -   [element not visible](#element-not-visible)
    -   [element exists](#element-exists)
    -   [element not exists](#element-not-exists)
-   [AssertForm](#assertform)
    -   [select value](#select-value)
    -   [input value](#input-value)
    -   [input not value](#input-not-value)
    -   [input enabled](#input-enabled)
    -   [input disbled](#input-disbled)
    -   [checkbox checked](#checkbox-checked)
    -   [checkbox unchecked](#checkbox-unchecked)
-   [AssertURL](#asserturl)
    -   [on homepage](#on-homepage)
    -   [url](#url)
    -   [url match](#url-match)
    -   [url query match](#url-query-match)
-   [Form](#form)
    -   [fill field](#fill-field)
    -   [fill multiple](#fill-multiple)
    -   [choose in select](#choose-in-select)
    -   [check](#check)
    -   [uncheck](#uncheck)
-   [Navigation](#navigation)
    -   [base url](#base-url)
    -   [homepage](#homepage)
    -   [browse](#browse)
    -   [reload](#reload)
    -   [back](#back)
-   [Utility](#utility)
    -   [screenshot](#screenshot)
    -   [viewport](#viewport)
    -   [wait](#wait)

### Action

#### click

Click on an element based on given selector.

/^(?:|I )click on (?:|the )"([^"]\*)"/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
When I click on "button.showModal"
```

```javascript
When I click on the "input[type='submit']"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves after action completes

#### hover

Hover an element with cursor (activate CSS :hover property).

/^(?:|I )hover (?:|over ) (?:|the)"([^"]\*)" element/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
When I hover "nav.menu" element
```

```javascript
When I hover the "select:eq(1)" element
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves after action completes

#### submit

Submits a form found by given selector. The submit command may also be applied to any element that is a descendant of a form element.

/^(?:|I )submit (?:|the )"([^"]\*)" form/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
When I submit "form#register" form
```

```javascript
When I submit the "form.login" form
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves after action completes

#### press

Press a button element with string argument interpreted as (in order):
  1\. CSS Selector
  2\. Partial text of button and <input type="submit" /> elements
  3\. Partial text of link elements

/^(?:|I )press "([^"]\*)"/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
When I press "button.register"
         And I press "Register"
         And I press "Submit"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves after action completes

#### follow

Follow a link element with string argument interpreted as (in order):
  1\. CSS Selector
  3\. Partial text of link elements

/^(?:|I )follow "([^"]\*)"/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
When I follow "a[href='/about']"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves after action completes

#### sendKey

Send the key(s) to the matched element

/^(?:|I )send key "([^"]_)" in "([^"]_)" element/

/^(?:|I )type "([^"]_)" in(?:|to) (?:|the )"([^"]_)" element/

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key(s) to send
-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
When I send key "Matthew" in "input[name='firstname']" element
```

```javascript
When I type "Matthew" into the "input[name='firstname']" element
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves after action completes

### AssertDOM

#### html contains

Assert page sources (with tags) contains the provided string.

/^(?:|I )should see "([^"]\*)"$/

##### Parameters

-   `expected` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The text content expected to be present

##### Examples

```javascript
Then I should see "Home Page"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### html not contains

Assert page sources (with tags) contains the provided string.

/^(?:|I )should not see "([^"]\*)"$/

##### Parameters

-   `expected` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The text content expected to be present

##### Examples

```javascript
Then I should not see "Detail Page"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### html match

Assert page sources (with tags) match the provided RegExp.

/^(?:|I ) should see text matching (.+)$/

##### Parameters

-   `regex` **[RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)** Regular expression

##### Examples

```javascript
Then I should see text matching Post-\d+
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### html not match

Assert page sources (with tags) do not match the provided RegExp.

/^(?:|I )should not see text matching (.+)$/

##### Parameters

-   `regex` **[RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)** Regular expression

##### Examples

```javascript
Then I should not see text matching .+@.+
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### html element count

Assert page contains n number of number of DOM-elements with the provided CSS Selector.

/^(?:|I )should see (\\d+) "([^"]\*)" elements?$/

##### Parameters

-   `expected` **integer** The expected count
-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then I should see 3 "section.post" elements
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### element contains

Assert DOM-element with the provided CSS Selector contains the provided text.

/^(?:|I )should see "([^"]_)" in the "([^"]_)" element$/

/^(?:|I )should see "([^"]_)" in the "([^"]_)" element(?:|'s) text$/

##### Parameters

-   `expected` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Regular expression
-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then I should see "Home Page" in the "h1" element
```

```javascript
Then I should see "Login" in the "h1" element text
```

```javascript
Then I should see "Login" in the "h1" element's text
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### element not contains

Assert DOM-element(s) with the provided CSS Selector do not contains the provided text.

/^(?:|I )should not see "([^"]_)" in the "([^"]_)" element$/

/^(?:|I )should not see "([^"]_)" in the "([^"]_)" element text$/,

##### Parameters

-   `expected` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Regular expression
-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then I should not see "Post Detail Page" in the "h1" element
```

```javascript
Then I should not see "Register" in the "h1" element text
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### element visible

Assert if the selected DOM-element found by given selector is visible.

/^I should see an? "([^"]\*)" element$/

/the "([^"]\*)" element should be visible$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then I should see an "h2.content-subhead" element
```

```javascript
Then the ".alert.alert-danger" element should be visible
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### element not visible

Assert if the selected DOM-element found by given selector is not visible.

/^I should not see an? "([^"]_)" element$/
/the "([^"]_)" element should not be visible$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then I should not see an "h2.content-subhead" element
```

```javascript
Then the ".alert.alert-danger" element should not visible
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### element exists

Assert that at least one element exits matching given selector.

/^the "([^"]\*)" element should exist$/

/there should be an? "([^"]\*)" element$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then the "h2.content-subhead" element should exist
```

```javascript
Then there should be a "span.warning" element
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### element not exists

Assert that no element exists matching given selector.

/^the "([^"]_)" element should exist$/
/there should not be an? "([^"]_)" element$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then the "h2.content-subhead" element should not exist
```

```javascript
Then there should not be a "button" element
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

### AssertForm

#### select value

Assert the currently selected option of a select field contains provided text.

/^the "([^"]_)" current option contain "([^"]_)"$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element
-   `expected` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Text content of the expected selected option

##### Examples

```javascript
Then the "select[name='country']" current option contain "USA"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### input value

Assert if the input’s value of given selector contains provided text.

/^the "([^"]_)" field should contain "([^"]_)"$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element
-   `expected` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Text content of the expected value

##### Examples

```javascript
Then the "textarea[name='description']" field should contain "My text"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### input not value

Assert if the input’s value of given selector do not contains provided text.

/^the "([^"]_)" field should not contain "([^"]_)"$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element
-   `expected` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Text content of the value to check does not exist

##### Examples

```javascript
Then the "textarea[name='description']" field should not contain "My first name"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### input enabled

Assert that the element matching given selector is enabled

/the "([^"]\*)" (?:field|element) should be enabled$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then the "input[type='submit']" element should be enabled
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### input disbled

Assert that the element matching given selector is disabled

/the "([^"]\*)" (?:field|element) should be disabled/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then the "input[type='submit']" element should be disabled
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### checkbox checked

Assert that the element matching given selector is checked

/the "([^"]\*)" checkbox should be checked$/

/the checkbox "([^"]\*)" (?:is|should be) checked$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then the "input[name='agree']" checkbox should be checked
```

```javascript
Then the checkbox "input[name='agree']" should be checked
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### checkbox unchecked

Assert that the element matching given selector is unchecked

/the "([^"]\*)" checkbox should not be checked$/

/the checkbox "([^"]\*)" should (?:be unchecked|not be checked)$/

/the checkbox "([^"]\*)" is (?:unchecked|not checked)$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector of target element

##### Examples

```javascript
Then the "#checkbox-input" checkbox should not be checked
```

```javascript
Then the checkbox "#checkbox-input" should not be checked
```

```javascript
Then the checkbox "#checkbox-input" is unchecked
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

### AssertURL

#### on homepage

Assert current URL pathname equals ‘/’.

/^(?:|I )should be on "([^"]\*)"/

##### Examples

```javascript
Then I should be on the homepage
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### url

Assert current URL pathname equals the given string.

/^(?:|I )should be on "([^"]\*)"$/

##### Parameters

-   `location`  

##### Examples

```javascript
Then I should be on "/post/1"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### url match

Assert current URL pathname match against provided RegExp.

/the url should match (.+)/

##### Parameters

-   `regex`  

##### Examples

```javascript
Then the url should match ^\/post\/\d+
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

#### url query match

Assert current URL query string match against provided RegExp.

/^the url parameter should match (.+)$/

##### Parameters

-   `regex`  

##### Examples

```javascript
Then the url parameter should match ^\/post\/\d+
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves if assertion passes

### Form

#### fill field

Send a sequence of key strokes to an element (clears value before).
You can also use unicode characters like Left arrow or Back space.
See the [protract sendKeys method documentation](http://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.sendKeys)

/^(?:|I )fill in "([^"]_)" with "([^"]_)"$/

/^(?:|I )fill in "([^"]\*)" with:$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Css selector matching the target field element
-   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The text content to send

##### Examples

```javascript
Then I fill in "input[name='first_name']" with:
"""
My long multi-line text ...
"""
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when the action completes

#### fill multiple

Send a sequence of key strokes to an element (clears value before).
You can also use unicode characters like Left arrow or Back space.
See the [protract sendKeys method documentation](http://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.sendKeys)

/^(?:|I )fill in the following:$/

##### Parameters

-   `hashDataTable`  
-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Css selector matching the target field element
-   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The text content to send

##### Examples

```javascript
When I fill in the following:
| input[name='first_name']     | John          |
| input[name='last_name']      | Doe           |
| textarea[name='description'] | Some text ... |
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when the action completes

#### choose in select

Select option that display text matching the argument.

/^(?:|I )select "([^"]_)" from "([^"]_)"$/

##### Parameters

-   `option` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Text content of the option
-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Css selector matching the target field element

##### Examples

```javascript
Then I select "France" from "select.country"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when the action completes

#### check

Check the checkbox with provided selector.

/^(?:|I )check "([^"]\*)"$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Css selector matching the target field element

##### Examples

```javascript
Then I check "#checkbox-input"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when the action completes

#### uncheck

Uncheck the checkbox with provided selector.

/^(?:|I )uncheck "([^"]\*)"$/

##### Parameters

-   `selector` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Css selector matching the target field element

##### Examples

```javascript
Then I uncheck "#checkbox-input-next"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when the action completes

### Navigation

#### base url

Set driver’s baseUrl. Useful to use short path in subsequent navigation (ex: “/login”)

/^(?:|I )browse "([^"]\*)"/

##### Parameters

-   `location` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The base URL as a full, absolute URL

##### Examples

```javascript
When I browse "http://127.0.0.1:3000/
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when the action completes

#### homepage

Navigate to homepage, ie: baseUrl + ‘/’

/^(?:|I )am on (?:|the )homepage$/

/^(?:|I )go to (?:|the )homepage/

##### Examples

```javascript
When I am on the homepage
```

```javascript
When I go to the homepage
```

```javascript
When I go to homepage
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when the action completes

#### browse

Browse given URL or path. Protractor assumes it is an angular page

/^(?:|I )am on "([^"]\*)"/

/^(?:|I )go to "([^"]\*)"/

##### Parameters

-   `location` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to browse to, either absolute or relative

##### Examples

```javascript
When I am on "/post/2"
```

```javascript
When I go to "/articles/why-to-use-cucumber"
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when action completes

#### reload

Reload the current page.

/^(?:|I )reload the page/

##### Examples

```javascript
When I reload the page
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when action completes

#### back

Navigate backwards in the browser history, if possible.

/^(?:|I )move backward one page/

##### Examples

```javascript
When I move backward one page
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when action completes

### Utility

#### screenshot

Take a screenshot of the current viewport and save it at ./screenshot.png

/^(?:|I )take a screenshot/

##### Parameters

-   `width` **int** Desired view width
-   `height` **int** Desired view height

##### Examples

```javascript
Then I take a screenshot
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when action completes

#### viewport

Set browser viewport size, width and height in pixel. The default viewport is: { width: 1366, height: 768 } (most used screen resolution).

/the viewport is (\\d+)px width and (\\d+)px height/

##### Parameters

-   `width` **int** Desired view width
-   `height` **int** Desired view height

##### Examples

```javascript
When the viewport is 360px width and 568px height
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when action completes

#### wait

Wait for N seconds.

/^(?:|I )wait (\\d+) seconds?/

##### Parameters

-   `seconds` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number of seconds to wait

##### Examples

```javascript
Then I wait 10 seconds
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Resolves when action completes
