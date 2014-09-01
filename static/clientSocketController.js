function socketController(s) {
	this.socket = s;
	this.buttonDown = false;
};

socketController.prototype.sendButtonDown = function() {
	if(!this.buttonDown)
		this.socket.emit('buttondown');
	else return false;
};

socketController.prototype.sendButtonUp = function() {
	if(this.buttonDown)
		this.socket.emit('buttonup');
	else return false;
};

socketController.prototype.pressButton = function() {
	if(this.sendButtonDown())
		this.buttonDown = true;
	else return false;
};

socketController.prototype.depressButton = function() {
	if(this.sendButtonUp())
		this.buttonDown = false;
	else return false;
};