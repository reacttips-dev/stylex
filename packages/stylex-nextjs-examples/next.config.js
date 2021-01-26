const withTM = require('next-transpile-modules')(['stylex'], {unstable_webpack5: true});
const withStylex = require('@ladifire-opensource/stylex-nextjs-plugin');

module.exports = withStylex({
  inject: true // for nextjs, we must inject style to head
})(withTM());
