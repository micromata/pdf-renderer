/**
 * @author  Kai Dorschner <me@krnl.de>
 */
"use strict";

import fs from 'fs';
import handlebars from 'handlebars';
import wkhtmltopdf from 'wkhtmltopdf';

export default function render(templateFile, templateContext = {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(templateFile, (err, contentBuffer) => {
      if (err) return reject(res.end(err));
      const template = handlebars.compile(contentBuffer.toString('utf8'));
      console.log('Writing PDF with', templateContext);
      resolve(wkhtmltopdf(template(templateContext)));
    });
  });
}
