var socket = io();

//reading data from server
socket.on('welcome message', function(data){
	$('#messages').append($('<li>').text(data)); //adding thing to list with id message in the html
	console.log("welcome is working");
})

// socket.on('latest message', function(data){
// 	$('#messages').append($('<li>').text(data.userName + ": " + data.message)); 
// });

// socket.on('message confirmation', function(data){
// 	window.alert(data.text);
// });

socket.on('send image', function(data){
	if(data.imageName == "santa"){
		$('#images').append($('<div><img src="santa.jpg"></div>'));
	}
})



//sending data to server
//attach to form
$('form').submit(submitFired); //grad form and submit 

function submitFired() {
	var dataFromClient = {
		'msgText': $('#m').val() //storing value from id m
	}
	socket.emit('chat message', dataFromClient);
	$('#m').val();
	return false;
}
