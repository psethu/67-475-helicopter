var socket = io();
var controller = new socketController(socket);

socket.on('confirm', function() {
	alert('sockets work');
});


//Everything else