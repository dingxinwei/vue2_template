const { getOptions } = require('loader-utils');
// no-console-loader.js
module.exports = function(source) {
  const callback = this.async();
  const options = getOptions(this) || {};
  console.log(options);
  setTimeout(() => {
    callback(null, source.replace(/console\.log/g, ''));
  }, 1000);
  // return source.replace(/console\.log\(.*?\);?/g, '');
};
