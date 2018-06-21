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

//grab item by id
jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {

	});
});