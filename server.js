'use strict'

var http = require('http');
var express = require('express');
var suportFile = require('./libs/supportFile');
var mConversation = require('./libs/mConversation');

var app = express();
var socketIDNick = [];

// File static public
app.use('/', express.static('./public'));

// HTTP /err
app.get('/err', function (req, res) {
    let sup = new suportFile();
    sup.sendErr400(res);
});

// Tạo server, socket và port để lắng nghe
var server = http.Server(app);
var io = require('socket.io')(server);

server.listen(3000, function () {
    console.log("server is running in port 3000");
});

// socket cho mỗi request lên Hosting
io.on('connection', function (socket) {
    let yourname = '';
    let mConv = new mConversation();

    // Khi 1 User connect đến server: thực hiện kiểm tra nickname
    socket.on('connection', function (data) {
        mConv.createNickname(socketIDNick, data, function (e) {
            console.log(e);
            if (!e) {
                socketIDNick.push(data);
                yourname = data;
                socket.emit("infor", yourname);
            }
        });

    });

    socket.on('disconnect', function () {
        console.log("server disconnect " + socket.id);
    });

    // Chat group
    socket.on('message_group', function (data) {
        socket.broadcast.emit('conversation_group', mConv.conversation(yourname, data));
    });
});