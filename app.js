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
    console.log("MouseDowns up, mouseDowns: "+this.mouseDowns);
};

socketController.prototype.removeMouseDown = function() {
	this.mouseDowns -= 1;
    console.log("MouseDowns down, mouseDowns: "+this.mouseDowns);
};

socketController.prototype.checkPress = function() {
	//if half or more of the players are pressing the button, return true
	if (this.players > 0 && this.mouseDowns >= (this.players / 2)) {
        console.log("Going Up");
		return true;
	}
    console.log("Going Down");
	return false;
};


/////////////
// Routes
/////////////

app.get('/', function(req, res){
	res.sendFile(__dirname + "/static/index.html");
});

app.get('/static/:file', function(req, res){
	res.sendFile(__dirname + "/static/" + req.params.file);
});


http.listen(process.env.PORT || 3000, function(){
	console.log('listening on port 3000');
});

///////////////
// Sockets
///////////////

io.on('connection', function(socket){
	console.log("players: "+controller.players);
	

	socket.on('join', function(){
		controller.addPlayer();
	});

	socket.on('buttondown', function(){
		controller.addMouseDown();
		socket.emit('test');
		console.log('mouseDowns: '+controller.mouseDowns);
	});

	socket.on('buttonup', function(){
		controller.removeMouseDown();
		socket.emit('testup');
		console.log('mouseDowns: '+controller.mouseDowns);
	});

	socket.on('numplayersreq', function() {
		socket.emit('players', controller.players);
	});

	socket.on('nummousedownsreq', function() {
		socket.emit('mousedowns', controller.mouseDowns);
	});

	socket.on('checkpressreq', function() {
		var res = controller.checkPress();
		socket.emit('checkpress', res);
	});

	socket.on('disconnect', function(){
		controller.removePlayer();
	});
});


