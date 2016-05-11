var editor_io = socket_io.of('/editor');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var getDirName = path.dirname;

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);
    fs.writeFile(path, contents, cb);
  });
}

var diretoryTreeToObj = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);
        var pending = list.length;
        if (!pending)
            return done(null, []);
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};

editor_io.on('connection', function(socket){
	console.log('Editor geöffnet');

	socket.on('getObjectHierarchie', function(_callback){
		diretoryTreeToObj('src/objects', function(err, _hierarchie){
			if(err)
				console.error(err);
			_callback(_hierarchie);
		});
	});
	
	socket.on('addObject', function(_data, _callback){
		writeFile('src/objects/test/test.ts','test', function(){
			_callback();
		});
	});
  
});