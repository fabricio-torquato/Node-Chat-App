var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createEmail', {
        to: "lala",
        text: "eae"
    })
    socket.emit('createMessage', {
        from: 'Tal pessoa',
        text: "ola",
        createdAt: "xxx"
    })
});

socket.on('disconnect', function () {
    console.log('Disconnect to server');
});

socket.on('newEmail', function (emit) {
    console.log('New Email', emit);
})
socket.on('newMessage', function (emit) {
    console.log('New Message', emit);
})


