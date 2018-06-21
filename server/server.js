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

	//custom events for email
	//emit = create new eveent
	socket.emit('newMessage', {
		from: 'adam@test.com',
		text: 'this is a new message',
		createdAt: 123
	});

	socket.on('createMessage', (message) => {
		console.log('Event works', message);
	});


	socket.on('disconnect', (socket) => {
		console.log('User disconnected');
	});
});



server.listen(port);

console.log(`Server up on ${port}`);