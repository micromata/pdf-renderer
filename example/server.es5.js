/**
 * @author  Kai Dorschner <me@krnl.de>
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var server = (0, _express2['default'])();

server.use(_bodyParser2['default'].json());
server.use(_bodyParser2['default'].urlencoded({ extended: true }));

server.use(_express2['default']['static']('static'));

server.post('/makepdf', function (request, response) {
  (0, _index2['default'])('pdf-template.html', request.body).then(function (stream) {
    response.type('application/pdf');
    stream.pipe(response);
  })['catch'](function (error) {
    return response.status(500).end({ error: error });
  });
});

server.get('/delay', function (request, response) {
  setTimeout(function () {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'X-Requested-With');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.end('Done');
  }, 2000);
});

server.listen(3000, function () {
  console.log('Listening on 3000');
});

