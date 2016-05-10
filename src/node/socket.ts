socket_io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('getItems', function(_callback){
	Item.find({}, function(err, _items) {
	  if (err) throw err;
	  _callback(_items);
	});
  });
  
  socket.on('getItem', function(_id, _callback){
	Item.findById(_id, function(err, _item) {
	  if (err) throw err;
	  _callback(_item);
	});
  });
  
  socket.on('saveItem', function(_id, _data){
	console.log('saveItem', _id, _data);
	Item.findOneAndUpdate({_id:_id}, _data, function(err, _item) {
	  if (err) throw err;
	  //socket.broadcast.emit('updateItem', _id, _data); 
	});
	socket.broadcast.emit('updateItem', _id, _data); 
  });
  
});

