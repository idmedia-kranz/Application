class Player extends Item {
	
	public static login:any = {};
	private clientId:any;
	
	constructor(_id:string){
		super(_id);
		this.on('connect', function(_socket){
			this.clientId = _socket.client.id;
		});
	}
	
	public static getSchemaData();
	public static getSchemaData(){return {
		level: Number,
		health: Number,
		username: String,
		passwort: String
	}}
	
	public static initLogin(){
		var login_io = socket_io.of('/login');
		login_io.on('connection', bind(function(_socket){
			_socket.on('login', bind(function(_username:string, _passwort:string, _callback){
				console.log(this.name+' Login success, client:', _socket.client.id);
				_socket.client.login = true;
				this.login[_socket.client.id] = {};
				_callback(true);
			},this));
		}, this));
		login_io.on('disconnect', bind(function(_socket){
			_socket.client.login = false;
			this.login[_socket.client.id] = null;
		}, this));
	}
	
}
Player.register(Item);
Player.initLogin();

GameObject.initClasses();

/*
var test = new Inventar.model({
	objects: [{
		class: 'Item',
		id: '5732638ed4a980b4318c94d8'
	},{
		class: 'Item',
		id: '57349b95caf841fc163fb2d3'
	},{
		class: 'Item',
		id: '57326493690ee26c113092a2'
	},{
		class: 'Player',
		id: '5734ed41a2306adc0de3516a'
	}]
});

test.save();
*/