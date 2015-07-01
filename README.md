# Install instructions

First of all please install the standalone CLI of [wkhtmltopdf](http://wkhtmltopdf.org/downloads.html) on your machine. If not already present, please install the latest version of [io.js](https://iojs.org/en/index.html) (tested with iojs v2.3.0). After that proceed with the normal `npm install` of this package. It'll **automatically** try to install babel globally as a preinstall script and trigger an `npm dedupe` as a postinstall.

After these steps you are ready to go.

# Starting the server

`npm start` handles the on-the-fly transpilation of the index.js (which es written in ES6). If you want to skip the on-the-fly step you'll need to transpile the index.js once and persist it via `babel index.js > index.transpiled.js`.
Keep in mind that some ES6 features may not be transpiled since they are already natively implemented in io.js ([Arrow functions](https://leanpub.com/exploring-es6/read#ch_arrow-functions) in particular). This step is dependent on the entries of the `.babelrc` file in combination with the `package.json`both located in the project root.

# Usage
Start you webbrowser and navigate to `http://localhost:3000`. This will make the content of `/static` available to the browser. Since directory listing isn't enabled be sure to provide an `index.html` as an entry point.

To generate a PDF send either a JSON-object as an HTTP-POST payload via AJAX to `http://localhost:3000/makepdf` or send an ordinary `<form action="/makepdf" method="post">` to the same destination.
Either way the object keys will be used to identify the placeholders in the serverside Handlebars template.
After the POST the server will compile the template, render it to PDF and stream it back to the client.

# TL;DR
* Install [wkhtmltopdf](http://wkhtmltopdf.org/downloads.html)
* Install [io.js](https://iojs.org/en/index.html)
* Run `npm install`
* Run `npm start`
* Send an HTTP-POST to `http://localhost:3000/makepdf` with the payload `{"placeholder": "Actual content"}`
* In return you will receive a PDF with the "Actual content"
