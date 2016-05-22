class GameObject {
	
	public static name;
	public static instances:any;
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
	
	constructor(_id:string){
		this.id = _id;
	}
	
	public static getSchemaData(){return {
	  created_at: Date,
	  updated_at: Date
	}}
	
	public on(_eventname, _callback){
		this[_eventname].on(bind(_callback, this));
	}
	
	public emit(_action, _data, _callback){
		session.io.emit(_action, this.id, _data, bind(_callback, this));
	}
	
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
				child.schemaData = extend({}, (child.schemaData||child.getSchemaData()), (parent.root.schemaData||parent.root.getSchemaData()));
				GameObject.classes[child.name] = GameObject.classes[child.name] || child;
			}
		}
		for(let classname in GameObject.classes){
			var objectclass = GameObject.classes[classname];
			objectclass.schema = new Schema(objectclass.schemaData);
			objectclass.schema.pre('save', function(next) {
			  var currentDate = new Date();
			  this.updated_at = currentDate;
			  if (!this.created_at)
				this.created_at = currentDate;
			  next();
			});
			objectclass.model = mongoose.model(objectclass.name, objectclass.schema);
			GameObject.instances = {};
		}
		GameObject.initSaveInterval();
	}
	
	public static initSaveInterval(){
		GameObject.saveInterval = setInterval(function(){
			for(var id in GameObject.instances) {
				if(GameObject.instances[id].data){
					GameObject.instances[id].data.save();
				}
			}
		}, GameObject.saveIntervalTime);
	}

	public static loadObjects(_ids){
		for(var id of _ids) {
			GameObject.instances = GameObject.instances || {};
			if(!GameObject.instances[id]){
				GameObject.instances[id] = new this(id);
				GameObject.instances[id].class = this;
			}
		}
	}

	public loadObject(_callback){
		if(GameObject.instances && GameObject.instances[this.id].data){
			_callback(GameObject.instances[this.id].data);
		} else {
			this.class.model.findById(this.id, bind(function(err, _object) {
				if (err) throw err;
				GameObject.instances[this.id].data = _object;
				_callback(_object);
			}, this));
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
	
}
GameObject.register();