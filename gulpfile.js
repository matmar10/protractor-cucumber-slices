'use strict';

const gulp = require('gulp');
const replace = require('gulp-string-replace');

function formatCucumberExamples() {
  const opts = {
    logs: {
      enabled: false,
    },
  };
  return gulp.src('./docs/steps.md')
    .pipe(replace(/```javascript/gi, '```gherkhin', opts))
    // https://cucumber.io/docs/gherkin/reference/
    .pipe(replace(/```gherkhin\n(Given .*|When .*)/g, function (matched, keyword) {
      return `\`\`\`gherkhin\nFeature: Example feature\n  Scenario: Sample scenario\n    ${keyword}\n    Then the "h1" element should be visible`;
    }, opts))
    .pipe(replace(/```gherkhin\n(Then )/g, function (matched, keyword) {
      return `\`\`\`gherkhin\nFeature: Example feature\n  Scenario: Sample scenario\n    When I press "Next"\n    ${keyword}`;
    }, opts))
    .pipe(gulp.dest('./docs/'));
}

exports.formatCucumberExamples = formatCucumberExamples;
