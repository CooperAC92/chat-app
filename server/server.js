const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//use index.html page
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('NewUser Connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));
	//custom events for email
	//emit = create new eveent

	socket.on('createMessage', (message, callback) => {
		console.log('Event works', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});


	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', (socket) => {
		console.log('User disconnected');
	});
});



server.listen(port, () => {
	console.log(`Server up on ${port}`);
});
