var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	socket.emit('createMessage', {
		from: 'adam',
		text: 'text text 123'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

//custom events

socket.on('newMessage', function(message) {
	console.log('new message: ', message);
});