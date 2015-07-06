/**
 * @author  Kai Dorschner <me@krnl.de>
 */
"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import renderPdf from '../index';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use(express.static('static'));

server.post('/makepdf', (request, response) => {
  renderPdf('pdf-template.html', request.body)
    .then(stream => {
      response.type('application/pdf');
      stream.pipe(response);
    })
    .catch(error => response.status(500).end({error}));
});

server.listen(3000, () => {
  console.log('Listening on 3000');
});
