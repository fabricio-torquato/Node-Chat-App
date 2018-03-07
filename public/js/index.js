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
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}   : ${message.text}`);

    $('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>')
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    })
});

var locationBtn = $('#sendGeoLocation');
locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geo Location not suported by your browser');
    }
    locationBtn.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationBtn.removeAttr('disabled').text('Send location');
    }, function (err) {
        locationBtn.removeAttr('disabled').text('Send location');
        alert('Unable to fetch position');
    });


})