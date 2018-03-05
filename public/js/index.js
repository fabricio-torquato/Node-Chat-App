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

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    })
});

var locationBtn = $('#sendGeoLocation');

locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geo Location not suported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function (err) {
        alert('Unable to fetch position');
    });


})