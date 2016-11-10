var express = require('express'); //need to split things so app.use works
var app = express();
var server =  require('http').Server(app);
var port = 9000;
var io = require('socket.io')(server);

var fs = require('fs');

function mainReqHandler(req, res){
	// res.send("hello kiddos");
	res.sendFile(__dirname + '/public/index.html');
}

// app.get('/', mainReqHandler);

app.use('/', express.static(__dirname + '/public')); //so it connects to everyhting in the folder

function serverUpCallback(){
	console.log("listening on port: " + port);
}

function incomingSocketHandler(socket){
	console.log('a user has connected');
	// console.log(socket);
	console.log(socket.conn.server.clientsCount);
	//assign user name
	socket.userName = "User " + socket.conn.server.clientsCount;

	socket.emit("welcome message", "Welcome user!");
	//listen for 'chat message' which is title of our emit
	socket.on('chat message', function(dataFromClient){
		var dataFromServer = {
			'userName': socket.userName,
			'message' : dataFromClient.msgText
		}
		console.log(dataFromServer);
		io.emit('latest message', dataFromServer);
		socket.emit('message confirmation', {'text': "your message was sent"});

		var imageLoading = {
			'imageName': "santa",
		}
		socket.emit('send image', imageLoading);
	});

	// fs.readFile(__dirname + '/images/santa.jpg', function(err, buf){
 //    // it's possible to embed binary data
 //    // within arbitrarily-complex objects
 //    console.log('image file is initialized');
 //    socket.emit('image', { image: true, buffer: buf });
 //  })

}

io.on('connection', incomingSocketHandler);

server.listen(port,serverUpCallback);