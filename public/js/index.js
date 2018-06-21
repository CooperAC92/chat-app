var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

//custom events

socket.on('newMessage', function(message) {
	console.log('new message: ', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	//append the message to the list id"messages"
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My Current Location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);

	li.append(a);
	jQuery('#messages').append(li);
});

//grab item by id
jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextbox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function () {
		//clear chat box
		messageTextbox.val('')
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if(!navigator.geolocation) {
		return alert('no location data');
	}

	locationButton.attr('disabled', 'disabled').text('Sending Location...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled');
		locationButton.text('Send Location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		alert('Unable to fetch loc data');
		locationButton.removAttr('disabled').text('Send location');
	})
});