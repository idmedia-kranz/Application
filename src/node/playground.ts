var playground_io = socket_io.of('/playground');

var playground_data = {
	'Item': ['5732638ed4a980b4318c94d8', '57349b95caf841fc163fb2d3', '57326493690ee26c113092a2']
};

playground_io.on('connection', function(socket){
	console.log('Playground entered');
	socket.on('disconnect', function(){
		console.log('Playground leaved');
	});
	
	socket.on('getObjects', function(_callback){
		for(let classname in playground_data){
			if(GameObject.classes[classname]){
				GameObject.classes[classname].loadObjects(playground_data[classname]);
				_callback(playground_data);
			}
		}
	});
});