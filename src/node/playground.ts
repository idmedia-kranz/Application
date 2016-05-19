var playground_inventar = '573a0121ee76121c11519259';

session.authenticate.on(function(_socket){
	GameObject.classes['Inventar'].loadObjects([playground_inventar]);
	_socket.emit('loadPlayground', playground_inventar);
});