class Session {
	
	public static actions = ['load', 'update'];
	
	private io;
	private sockets = {};
	private events = {};
	
	constructor(){
		this.io = socket_io.of('/session');
		this.io.on('connection', bind(this.clientConnect, this));
	}
	
	private clientConnect(_socket){
			console.log('Session created');
			_socket.on('authenticate', bind(function(_username, _passwort, _callback){
				this.sockets[_username] = _socket;
				this.setActions(_socket);
				_callback(true);
			}, this));
	}
	
	private setActions(_socket){
		for(var action of Session.actions){
			_socket.on(action, bind(function(_id, _data?){
				console.log('Session receive ', _id, action, _data);
				if(this.events[_id]&&this.events[_id][action]){
					this.events[_id][action](_socket, _data);
				} else {
					console.log('Action '+action+' for '+_id+' not found');
				}
			}, this));
		}
	}
	
	public on(_action, _id, _func){
		console.log('Session on', _action, _id);
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
var session = new Session();