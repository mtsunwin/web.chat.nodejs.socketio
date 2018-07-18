var http = require('http');
var express = require('express');
var suportFile = require('./libs/supportFile');

var app = express();

app.use('/', express.static('./public'));


app.get('/err', function (req, res) {
    let sup = new suportFile();
    sup.sendErr400(res);
});

app.listen(3000, () => console.log("oke baby"));