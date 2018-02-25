const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')
const {
    generateMessage
} = require('./utils/message');
const publicPatch = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
//mudanca feita para fazer um servidor que funcione o socketIO
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPatch));


io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))




    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Createmessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is form server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

    });
});

server.listen(port, () => {
    console.log('Server is up on port ' + port);
})