class Player extends Item {
	
	public static login:any = {};
	//private clientId:any;
	
	constructor(_id:string){
		super(_id);
		//this.on('connect', function(_socket){
		//	this.clientId = _socket.client.id;
		//});
	}
	
	public static getSchemaData();
	public static getSchemaData(){return {
		level: Number,
		health: Number,
		username: String,
		passwort: String
	}}
	
}
Player.register(Item);

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