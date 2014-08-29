var app = require('express')();


app.get('/', function(req, res){
	res.send("<h1>Hello, world!</h1>")
});


app.listen(process.env.PORT || 3000, function(){
	console.log('listening on port 3000');
});

