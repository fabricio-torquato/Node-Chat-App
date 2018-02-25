var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createEmail', {
        to: "lala",
        text: "eae"
    })
});

socket.on('disconnect', function () {
    console.log('Disconnect to server');
});

socket.on('newEmail', function (emit) {
    console.log('New Email', emit);
})
socket.on('newMessage', function (message) {
   var li = $('<li></li>');
   li.text(`${message.from}: ${message.text}`);

   $('#messages').append(li);
})

$('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    },function(){

    })
})