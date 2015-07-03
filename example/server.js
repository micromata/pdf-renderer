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

server.post('/makepdf', (req, res) => {
  renderPdf('pdf-template.html', req.body).then(stream => {
    // TODO Sending an Content-Type: application/pdf might be important for some browsers
    res.type('application/pdf');
    stream.pipe(res);
  });
});

server.listen(3000, () => {
  console.log('Listening on 3000');
});
