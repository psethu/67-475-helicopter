function socketController(s) {
	this.socket = s;
	this.buttonDown = false;
};

socketController.prototype.sendButtonDown = function() {
	if(this.buttonDown)
		this.socket.emit('buttondown');
};

socketController.prototype.sendButtonUp = function() {
	if(!this.buttonDown)
		this.socket.emit('buttonup');
};

socketController.prototype.pressButton = function() {
	this.buttonDown = true;
	this.sendButtonDown();
};

socketController.prototype.depressButton = function() {
	this.buttonDown = false;
	this.sendButtonUp();
};