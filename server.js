const path = require('path');
const favicon = require('express-favicon');
const expressStaticGzip = require('express-static-gzip');
const express = require('express');

const port = process.env.PORT || 5000;
const app = express();

app.use("/", expressStaticGzip(path.join(__dirname, 'build')));
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var server = app.listen(port, function () {
    console.log('listening on port ', server.address().port);
});
