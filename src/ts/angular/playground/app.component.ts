/// <reference path="shared/interfaces/position.ts"/>
/// <reference path="shared/classes/inventarpoint.ts"/>

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

import {Component} from 'angular2/core';
import {Object} from './components/object/script';
import {PropertiesPipe} from './shared/index';

@Component({
    selector: 'playground',
    templateUrl: 'angular/playground/template.html',
	styleUrls   :   ['angular/playground/style.css'],
	directives: [Object],
	pipes: [PropertiesPipe]
})
export class Playground {
	
	static mousePosition:any;
	static mouseMoveEvent:any;
	
	private socket:any;
	private objects:any = {};
	
    constructor(){
		this.socket = io('/playground'); 
		this.socket.emit('getObjects', bind(this.receiveObjects, this));
    }
	
	private receiveObjects(_objects){
		console.log(_objects);
		this.objects = _objects;
	}

	private onMousemove(event) { 
		Playground.mousePosition = { x: event.clientX, y: event.clientY };
		if(Playground.mouseMoveEvent){
			Playground.mouseMoveEvent({ x: event.clientX, y: event.clientY });
		}
	}
	
}