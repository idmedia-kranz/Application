class Session {
	
	private io;
	
	constructor(){
		this.io = socket_io.of('/session');
		this.io.on('connection', bind(this.clientConnect, this));
	}
	
	private clientConnect(socket){
			console.log('Session created');
	}
}
var session = new Session();