class GameObject {
	
	public static name;
	public static collection:any;
	public static schema:any;
	public static model:any;
	public static saveInterval:any;
	public static saveIntervalTime:number = 10000;
	public static schemaData:any;
	public static hierarchie:any = {};
	public static classes:any = {};
	
	public id:string;
	public io:any;
	public position:any;
	public data:any;
	public class:any;
	
	//LiteEvents
	private eventOnConnect = new LiteEvent<string>(); 
	private eventOnUpdateData = new LiteEvent<string>(); 
	
	public get connect(): ILiteEvent<string> { return this.eventOnConnect; } 
	public get updated(): ILiteEvent<string> { return this.eventOnUpdateData; } 
	
	public static register(_parent=GameObject){
		GameObject.hierarchie[_parent.name] = GameObject.hierarchie[_parent.name] || [];
		GameObject.hierarchie[_parent.name].root = GameObject.hierarchie[_parent.name].root || _parent;
		GameObject.hierarchie[_parent.name].children = GameObject.hierarchie[_parent.name].children || [];
		GameObject.hierarchie[_parent.name].children.push(this);
	}
	
	public static initClasses(){
		for(let parentname in GameObject.hierarchie){
			var parent = GameObject.hierarchie[parentname];
			for(let child of parent.children){
				//console.log('parent: '+parent.root.name+' Child: '+child.name);
				child.schemaData = extend({}, (child.schemaData||child.getSchemaData()), (parent.root.schemaData||parent.root.getSchemaData()));
				GameObject.classes[child.name] = GameObject.classes[child.name] || child;
			}
		}
		for(let classname in GameObject.classes){
			var objectclass = GameObject.classes[classname];
			objectclass.schemaData
			objectclass.schema = new Schema(objectclass.schemaData);
			objectclass.schema.pre('save', function(next) {
			  var currentDate = new Date();
			  this.updated_at = currentDate;
			  if (!this.created_at)
				this.created_at = currentDate;
			  next();
			});
			objectclass.model = mongoose.model(objectclass.name, objectclass.schema);
			objectclass.collection = {};
			//console.log('Erzeuge Model für '+objectclass.name);
		}
		GameObject.initSaveInterval();
	}
	
	public static getSchemaData(){return {
	  type: String,
	  created_at: Date,
	  updated_at: Date
	}}
	
	public static initSaveInterval(){
		GameObject.saveInterval = setInterval(function(){
			//console.log('initSaveInterval');
			for(let classname in GameObject.classes){
				var objectclass = GameObject.classes[classname];
				for(var id in objectclass.collection) {
					//console.log('Save Object');
					if(objectclass.collection[id].data)
						objectclass.collection[id].data.save();
				}
			}
		}, GameObject.saveIntervalTime);
	}

	public static loadObjects(_ids){
		//console.log(this.name, 'loadObjects', _ids);
		for(var id of _ids) {
			this.collection = this.collection || {};
			if(!this.collection[id]){
				//console.log('Object not Found in '+this.name+'.collection');
				this.collection[id] = new this(id);
				this.collection[id].class = this;
			}
		}
		
	}

	public loadObject(_callback){
		//console.log('loadObject '+this.id+' in', this.class.name);
		if(this.class.collection && this.class.collection[this.id].data){
			//console.log('Data for '+this.id+' found in '+this.class.name+' collection');
			_callback(this.class.collection[this.id].data);
		} else {
			//console.log('Data for '+this.id+' not found in collection');
			this.class.model.findById(this.id, bind(function(err, _object) {
				if (err) throw err;
				//console.log('Search in Database: ',_object);
				this.class.collection[this.id].data = _object;
				_callback(_object);
			}, this));
		}
	}
	
	public updateData(_data){
		console.log('updateData', _data);
		if(this.data){
			for (var attr in _data) {
				this.data[attr] = _data[attr];
			}
			this.io.emit('updateData', _data);
			this.eventOnUpdateData.trigger(_data);
		}
	}
	
	public jsonData(){
		var json = {};
		if(this.data)
			for (var attr in this.class.schemaData) {
				if(attr != 'created_at' && attr != 'updated_at')
					json[attr] = this.data[attr];
			}
		return json;
	}
	
	public clientConnect(_socket){

		this.loadObject(bind(function(_data?){
			//console.log('Object client call', this.jsonData());
			if(this.data)
				_socket.emit('loadObject', this.jsonData());
		}, this));
		
		_socket.on('disconnect', function(){
			//console.log('Object leave');
		});
		
		_socket.on('updateData', bind(this.updateData, this));
		//console.log(typeof this.connection );
			
		this.eventOnConnect.trigger(_socket);
	}	
	
	constructor(_id:string){
		this.id = _id;
		this.io = socket_io.of('/'+this.id);
		this.io.on('connection', bind(this.clientConnect, this));
	}
}
GameObject.register();