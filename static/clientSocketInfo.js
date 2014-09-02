function serverInfo(s) {
	this.socket = s;
	this.lastNumPlayers = 0;
	this.lastNumMouseDowns = 0;
	this.press = false;


	var that = this;
	this.socket.on('players', function(n) {
		that.setNumPlayers(n);
	});

	this.socket.on('mousedowns', function(n) {
		that.setNumMouseDowns(n);
	});

	this.socket.on('checkpress', function(b) {
		that.setPress(b);
		//console.log(that.press);
	});
}

serverInfo.prototype.getNumPlayers = function() {
	this.socket.emit('numplayersreq');
}

serverInfo.prototype.getNumMouseDowns = function() {
	this.socket.emit('nummousedownsreq');
}

serverInfo.prototype.checkPress = function() {
	this.socket.emit('checkpressreq');
}

serverInfo.prototype.setNumPlayers = function(n) {
	this.lastNumPlayers = n;
}

serverInfo.prototype.setNumMouseDowns = function(n) {
	this.lastNumMouseDowns = n;
}

serverInfo.prototype.setPress = function(b) {
	this.press = b;
}