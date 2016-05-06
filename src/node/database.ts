class Database {
	
	private dbURI:string;
	private logger:any;
	private mongoose:any;
	
	public connected:boolean;
	
	constructor(_mongoose, _server:string='localhost', _port:number, _database:string, _options?:any, _logger:any=console) {
	
		this.logger = _logger;
		this.connected = false;
		this.mongoose = _mongoose;
		this.dbURI = 'mongodb://'+_server+':'+_port.toString()+'/'+_database;
		this.logger.log('Mongoose wird gestartet...', '('+this.dbURI+')');
		this.mongoose.connect(this.dbURI, _options);
		
		var _this = this;
		
		this.mongoose.connection.on('connected', function () {
		  _this.logger.log('Mongoose default connection open to ' + _this.dbURI); 
		  _this.connected = true;
		}); 

		this.mongoose.connection.on('error',function (err) {  
		  _this.logger.log('Mongoose default connection error: ' + err);
		}); 

		this.mongoose.connection.on('disconnected', function () {  
		  _this.logger.log('Mongoose default connection disconnected'); 
		});
	}
	
}