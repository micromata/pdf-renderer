/**
 * @author  Kai Dorschner <me@krnl.de>
 */
"use strict";
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import Handlebars from 'handlebars';
import wkhtmltopdf from 'wkhtmltopdf';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('static'));

app.post('/makepdf', (req, res) => {
  fs.readFile('pdf-template.html', (err, contentBuffer) => {
    if (err) {
      console.error(err);
      return res.end(err);
    }
    const template = Handlebars.compile(contentBuffer.toString('utf8'));
    console.log('Writing PDF with', req.body);
    // TODO Sending an Content-Type: application/pdf might be important
    wkhtmltopdf(template(req.body)).pipe(res);
  });
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
