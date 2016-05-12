class Item extends GameObject {
	
	public static init:boolean = false;
		
	//Events
	private eventOnConnect = new LiteEvent<string>(); 
	private eventOnDisconnect = new LiteEvent<string>(); 
	private eventOnUpdateData = new LiteEvent<string>(); 
	public get connect(): ILiteEvent<string> { return this.eventOnConnect; } 
	public get disconnect(): ILiteEvent<string> { return this.eventOnDisconnect; } 
	public get updated(): ILiteEvent<string> { return this.eventOnUpdateData; } 
	
	constructor(_id:string){
		super(_id);
		this.io = socket_io.of('/'+this.id);
		this.io.on('connection', bind(this.clientConnect, this));
	}
	
	public static getSchemaData();
	public static getSchemaData(){return {
		type: String,
		position: { x: Number, y: Number },
	}}
	
	public clientConnect(_socket){
		console.log('connected '+this.class.name+', client:', _socket.client.id);
		this.loadObject(bind(function(_data?){
			if(this.data){
				_socket.emit('loadItem', this.jsonData());
			}
		}, this));
		_socket.on('disconnect', bind(function(){
			this.eventOnDisconnect.trigger(_socket);
		}, this));
		_socket.on('updateItem', bind(this.updateItem, this));
		this.eventOnConnect.trigger(_socket);
	}	
	
	public updateItem(_data){
		if(this.data){
			for (var attr in _data) {
				this.data[attr] = _data[attr];
			}
			this.io.emit('updateItem', _data);
			this.eventOnUpdateData.trigger(_data);
		}
	}
	
}
Item.register(GameObject);