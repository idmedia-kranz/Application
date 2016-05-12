class Item extends GameObject {

	public static getSchemaData();
	public static getSchemaData(){return {
		position: { x: Number, y: Number },
	}}
	
	private onUpdateData(_data){
		console.log('updated '+this.class.name);
	}
	
	private onConnect(_socket){
		console.log('connected '+this.class.name);
	}
	
	constructor(_id:string){
		super(_id);
		this.connect.on(bind(this.onConnect, this));
		this.updated.on(bind(this.onUpdateData, this));
	}
	
}
Item.register(GameObject);

GameObject.initClasses();