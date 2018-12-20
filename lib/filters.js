'use strict';

var jstransformer = require('jstransformer');

function getMinifyTransformerName(outputFormat) {
  switch (outputFormat) {
    case 'js': return 'uglify-js';
    case 'css': return 'clean-css';
  }
}

module.exports = filter;
function filter(name, str, options) {
  if (typeof filter[name] === 'function') {
    return filter[name](str, options);
  } else {
    var tr;
    try {
      tr = jstransformer(require('jstransformer-' + name));
    } catch (ex) {}
    if (tr) {
      // TODO: we may want to add a way for people to separately specify "locals"
      var result = tr.render(str, options, options).body;
      if (options && options.minify) {
        var minifyTranformer = getMinifyTransformerName(tr.outputFormat);
        if (minifyTranformer) {
          try {
            result = filter(minifyTranformer, result, null);
          } catch (ex) {
            // better to fail to minify than output nothing
          }
        }
      }
      return result;
    } else {
      throw new Error('unknown filter ":' + name + '"');
    }
  }
}
