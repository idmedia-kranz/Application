var playground_io = socket_io.of('/playground');

var playground_objects = {
	'Item': ['5732638ed4a980b4318c94d8', '57349b95caf841fc163fb2d3', '57326493690ee26c113092a2'],
	'Player': ['5734ed41a2306adc0de3516a']
};

playground_io.on('connection', function(_socket){
	console.log('Playground entered, client:', _socket.client.id);
	_socket.on('disconnect', function(){
		console.log('Playground leaved');
	});
	
	_socket.on('getObjects', function(_callback){
		if(_socket.client.login){
			for(let classname in playground_objects){
				if(GameObject.classes[classname]){
					GameObject.classes[classname].loadObjects(playground_objects[classname]);
					_callback(playground_objects);
				}
			}
		}
	});
});