class Session {
	
	public static actions = ['load', 'update'];
	
	private sockets = {};
	private events = {};
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
			if(this.events[_id]&&this.events[_id][_action]){
				this.events[_id][_action](_socket, _data, _callback);
			} else {
				console.log('Action '+_action+' for '+_id+' not found');
			}
		}, this));
	}
	
	private setActions(_socket){
		for(var action of Session.actions){
			this.setAction(action, _socket);
		}
	}
	
	public on(_action, _id, _func){
		this.events[_id] = this.events[_id] || {};
		this.events[_id][_action] = _func;
	}
	
	public static load(_id):string{
		return _id+'_load';
	}
	
	public static update(_id):string{
		return _id+'_update';
	}
}