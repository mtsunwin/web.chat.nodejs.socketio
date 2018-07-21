'use strict'

var mime = require('mime');
var path = require('path');
var fs = require('fs');

class supportFile {

    sendErr400(response) {
        fs.readFile('public/error.html', function (err, data) {
            if (!err) {
                response.writeHead(200, {'content-type': 'text/html'});
                response.write(data);
                response.end();
            }
        });
    }

    sendFile(res, filepath, data) {
        res.writeHead(200, {'content-type': mime.lookup(path.basename(filepath))});
        res.write(data);
        res.end();
    }

}

module.exports = supportFile