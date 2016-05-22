class Inventar extends GameObject {
	constructor(_id:string){
		super(_id);
	}
	
	public static getSchemaData();
	public static getSchemaData(){return {
		objects: [{class: String, id: String}]
	}}
		
	public load(_socket, _data, _callback){
		console.log('Load '+this.class.name+', client:', _socket.client.id);
		this.loadObject(bind(function(_data?){
			if(this.data){
				for(let object of this.data.objects){
					if(GameObject.classes[object.class]){
						GameObject.classes[object.class].loadObjects([object.id]);
					}
				}
				_callback(this.jsonData());
			}
		}, this));
	}	
	
}
Inventar.register(GameObject);