const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPatch = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
//mudanca feita para fazer um servidor que funcione o socketIO
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPatch));


io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    })
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    })




    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log('Createmessage', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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