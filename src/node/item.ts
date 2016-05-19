class Item extends GameObject {
	
	public static init:boolean = false;
		
	//Events
	private eventOnLoad = new LiteEvent<string>(); 
	private eventOnUpdateData = new LiteEvent<string>(); 
	public get loaded(): ILiteEvent<string> { return this.eventOnLoad; } 
	public get updated(): ILiteEvent<string> { return this.eventOnUpdateData; } 
	public static definitions = require('./src/json/definitions.json');
	
	constructor(_id:string){
		super(_id);
		this.setEvents();
	}
	
	public static getSchemaData();
	public static getSchemaData(){return {
		type: String,
		position: { x: Number, y: Number },
		inventarId: String
	}}
	
	private setEvents(){
		this.on('load', this.loadItem);
		this.on('update', this.updateItem);
	}
	
	public loadItem(_socket, _data, _callback){
		this.loadObject(bind(function(_data?){
			if(this.data){
				if(this.data.inventarId){
					GameObject.classes['Inventar'].loadObjects([this.data.inventarId]);
				}
				_socket.client.definitions = _socket.client.definitions || {};
				if(_socket.client.definitions[this.data.type]){
					_callback(this.jsonData());
				} else {
					if(Item.definitions[this.data.type]){
						_callback(this.jsonData(), Item.definitions[this.data.type] );
						_socket.client.definitions[this.data.type] = true;
					} else {
						console.log("Item-Definition for Type "+this.data.type+" not found.");
					}
				}
			}
		}, this));
		this.eventOnLoad.trigger(_socket);
	}	
	
	public updateItem(_socket, _data){
		if(this.data){
			for (var attr in _data) {
				this.data[attr] = _data[attr];
			}
			session.io.emit('update', this.id, _data)
			this.eventOnUpdateData.trigger(_data);
		}
	}
	
}
Item.register(GameObject);