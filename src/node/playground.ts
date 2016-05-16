var playground_io = socket_io.of('/playground');

var playground_inventar = '573a0121ee76121c11519259';

playground_io.on('connection', function(_socket){
	console.log('Playground entered, client:', _socket.client.id);
	_socket.on('disconnect', function(){
		console.log('Playground leaved');
	});
	
	_socket.on('getInventar', function(_callback){
		console.log('getInventar');

		GameObject.classes['Inventar'].loadObjects([playground_inventar]);
		_callback(playground_inventar);
	});
});