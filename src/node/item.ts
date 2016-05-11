const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

var extend = require('extend');

class Item {
	
	public static name;
	public static collection:any;
	public static schema:any;
	public static model:any;
	public static saveInterval:any;
	public static saveIntervalTime:number = 10000;
	public static schemaData:any;
	public static parentclass;
	private id:string;
	private io:any;
	private position:any;
	private data:any;
	
	public static initModel(){
		this.schemaData = (Item.parentclass) ? extend(this.schemaData, this.getSchemaData(), Item.parentclass.getSchemaData()) : this.getSchemaData();
		Item.parentclass = this;
		this.schema = new Schema(this.schemaData);
		this.schema.pre('save', function(next) {
		  var currentDate = new Date();
		  this.updated_at = currentDate;
		  if (!this.created_at)
			this.created_at = currentDate;
		  next();
		});
		this.model = mongoose.model(this.name, this.schema);
	}
	
	public static getSchemaData(){return {
	  type: String,
	  position: { x: Number, y: Number },
	  created_at: Date,
	  updated_at: Date
	}}
	
	public static initSaveInterval(){
		Item.saveInterval = setInterval(function(){
			console.log('initSaveInterval');
			for(var id in Item.collection) {
				console.log('Save Item');
				Item.collection[id].data.save();
			}
		}, Item.saveIntervalTime);
	}
	
	public static init(){
		this.initModel();
		if(!Item.saveInterval)
			Item.initSaveInterval();
	}
	
	public static loadItems(_items){
		for(var item of _items) {
			console.log('loadItems', item.id);
			Item.collection = Item.collection || {};
			Item.collection[item.id] = Item.collection[item.id] || new Item(item.id);
		}
	}

	private loadItem(_callback){
		console.log('loadItem', this.id);
		if(Item.collection[this.id].data){
			_callback();
		} else {
			Item.model.findById(this.id, bind(function(err, _item) {
				this.data = _item;
				if (err) throw err;
				_callback();
			}, this));
		}
	}
	
	private updateData(_data){
		console.log('updateData', this.data.id, _data);
		this.data.position = _data.position;
		this.io.emit('updateData', _data)
	}
	
	private jsonData(){
		return {
			"type": this.data.type,
			"position": this.data.position
		};
	}
	
	private connection(_socket){

		this.loadItem(bind(function(){
			console.log('Item call', this.jsonData());
			_socket.emit('loadItem', this.jsonData());
		}, this));
		
		_socket.on('disconnect', function(){
			console.log('Item leave');
		});
		
		_socket.on('updateData', bind(this.updateData, this));
	}
	
	private connect(){

	}
	
	constructor(_id:string){
		this.id = _id;
		this.io = socket_io.of('/'+this.id);
		this.io.on('connection', bind(this.connection, this));
		return this;
	}
}
Item.init();


class Test extends Item {
	public static getSchemaData();
	public static getSchemaData(){return {
	  health: Number
	}}
	
	constructor(_id:string){
		super(_id);
	}
}
Test.init();

class Test2 extends Test {
	public static getSchemaData();
	public static getSchemaData(){return {
	  Weight: Number
	}}
	
	constructor(_id:string){
		super(_id);
	}
}
Test2.init();

