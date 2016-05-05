class Database {
	
	private dbURI:string;
	private logger:any;
	private mongoose:any;
	
	constructor(_mongoose, _server:string='localhost', _port:number=27017, _database:string='game', _logger:any=console, _options?:string) {
		this.logger = _logger;
		this.mongoose = _mongoose;
		this.dbURI = 'mongodb://'+_server+':'+_port.toString()+'/'+_database+(_options?'?'+_options:'');
		this.logger.log('Mongoose wird gestartet...', '('+this.dbURI+')');
		this.mongoose.connect(this.dbURI);

		this.mongoose.connection.on('connected', function () {
		  this.logger.log('Mongoose default connection open to ' + this.dbURI); 
		}); 

		this.mongoose.connection.on('error',function (err) {  
		  this.logger.log('Mongoose default connection error: ' + err);
		}); 

		this.mongoose.connection.on('disconnected', function () {  
		  this.logger.log('Mongoose default connection disconnected'); 
		});

		this.mongoose.on('SIGINT', function() {  // If the Node process ends, close the Mongoose connection 
		  this.mongoose.connection.close(function () { 
			this.logger.log('Mongoose default connection disconnected through app termination'); 
			process.exit(0); 
		  }); 
		}); 
	}
	
}