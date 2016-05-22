class Session {
	
	public static actions = ['load', 'update'];
	
	private sockets = {};
	private eventOnAuthenticate = new LiteEvent<string>(); 
	public get authenticate(): ILiteEvent<string> { return this.eventOnAuthenticate; } 
	public io;
	
	constructor(){
		this.io = socket_io.of('/session');
		this.io.on('connection', bind(this.clientConnect, this));
	}
	
	private clientConnect(_socket){
			_socket.on('authenticate', bind(function(_username, _passwort, _callback){
				this.sockets[_username] = _socket;
				this.setActions(_socket);
				_callback(true);
				this.eventOnAuthenticate.trigger(_socket);
			}, this));
	}
	
	private setAction(_action, _socket){
		_socket.on(_action, bind(function(_id, _data, _callback){
			if(GameObject.instances[_id] && typeof GameObject.instances[_id][_action] === "function")
			GameObject.instances[_id][_action](_socket, _data, _callback);
		}, this));
	}
	
	private setActions(_socket){
		for(var action of Session.actions){
			this.setAction(action, _socket);
		}
	}
}