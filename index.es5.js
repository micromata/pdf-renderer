/**
 * @author  Kai Dorschner <me@krnl.de>
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = render;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _wkhtmltopdf = require('wkhtmltopdf');

var _wkhtmltopdf2 = _interopRequireDefault(_wkhtmltopdf);

function render(templateFile) {
  var templateContext = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return new Promise(function (resolve, reject) {
    _fs2['default'].readFile(templateFile, function (err, contentBuffer) {
      if (err) return reject(res.end(err));
      var template = _handlebars2['default'].compile(contentBuffer.toString('utf8'));
      console.log('Writing PDF with', templateContext);
      resolve((0, _wkhtmltopdf2['default'])(template(templateContext)));
    });
  });
}

module.exports = exports['default'];

