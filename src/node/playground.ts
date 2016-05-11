var playground_io = socket_io.of('/playground');
  
playground_io.on('connection', function(socket){
	console.log('Playground entered');
	socket.on('disconnect', function(){
		console.log('Playground leaved');
	});
	
	socket.on('getItems', function(_callback){
		Item.model.find({}, function(err, _items) {
		  if (err) throw err;
		  Item.loadItems(_items);
		  _callback(_items)
		});
	});
});