const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//use index.html page
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('NewUser Connected');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat',
		createdAt: new Date().getTime()

	})

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'new user joined the chat',
		createdAt: new Date().getTime()
	})
	//custom events for email
	//emit = create new eveent

	socket.on('createMessage', (message) => {
		console.log('Event works', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

		//event fires to everyone except the socket
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
	});


	socket.on('disconnect', (socket) => {
		console.log('User disconnected');
	});
});



server.listen(port);

console.log(`Server up on ${port}`);