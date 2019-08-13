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
    .pipe(replace(/```gherkhin\n(Given |When |Then |And |But )/g, function (matched, keyword) {
      return `\`\`\`gherkhin\nScenario: Sample scenario\n  ${keyword}`;
    }, opts))
    .pipe(gulp.dest('./docs/'));
}

exports.formatCucumberExamples = formatCucumberExamples;
