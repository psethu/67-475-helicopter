////////////////////////////
// Server Setup Code
////////////////////////////

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var controller = new socketController();

////////////////////
// Server Objects
////////////////////

function socketController() {
	this.players = 0;
	this.mouseDowns = 0;
	this.pressButton = false;
}

socketController.prototype.addPlayer = function() {
	this.players += 1;
};

socketController.prototype.removePlayer = function() {
	this.players -= 1;
};

socketController.prototype.addMouseDown = function() {
	this.mouseDowns += 1;
};

socketController.prototype.removeMouseDown = function() {
	this.mouseDowns -= 1;
};

socketController.prototype.checkPress = function() {
	if (this.players > 0 && this.mouseDowns >= (this.players / 2)) {
		return true;
	}
	return false;
};


/////////////
// Routes
/////////////

app.get('/', function(req, res){
	res.sendFile(__dirname + "/static/index.html")
});

app.get('/static/:file', function(req, res){
	res.sendFile(__dirname + "/static/" + req.params.file);
});


http.listen(3000, function(){
	console.log('listening on port 3000');
});


///////////////
// Sockets
///////////////

io.on('connection', function(socket){
	console.log('connection established');
	controller.addPlayer();

	//test
	io.emit('confirm');

	socket.on('buttondown', function(){
		controller.addMouseDown();
	});

	socket.on('buttonup', function(){
		controller.removeMouseDown();
	});

	socket.on('disconnect', function(){
		controller.removePlayer();
	});
});