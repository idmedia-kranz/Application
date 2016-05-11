import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'angular/editor/template.html',
	styleUrls   :   ['angular/editor/style.css']
})
export class AppEditor {

	private socket:any;
	private hierarchie:any;
	
    constructor(){
        this.socket = io('/editor');  
		this.socket.emit('getObjectHierarchie', this.bind(function(_hierarchie){
			console.log(_hierarchie);
			this.hierarchie = _hierarchie;
		}, this));
    }
	
	private newElement() {
		this.socket.emit('addObject', {}, function(){
			console.log('ObjectErstellt');
		});
	}
	
	private bind = (f, context, ...x) =>  (...y) => f.apply(context, x.concat(y));
	
}