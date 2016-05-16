class Inventar extends GameObject {
	constructor(_id:string){
		super(_id);
		this.io = socket_io.of('/'+this.id);
		this.io.on('connection', bind(this.clientConnect, this));
	}
	
	public static getSchemaData();
	public static getSchemaData(){return {
		objects: [{class: String, id: String}]
	}}
		
	public clientConnect(_socket){
		console.log('connected '+this.class.name+', client:', _socket.client.id);
		this.loadObject(bind(function(_data?){
			if(this.data){
				for(let object of this.data.objects){
					if(GameObject.classes[object.class]){
						GameObject.classes[object.class].loadObjects([object.id]);
					}
				}
				_socket.emit('loadInventar', this.jsonData() );
			}
		}, this));
	}	
	
}
Inventar.register(GameObject);