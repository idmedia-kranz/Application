/// <reference path="shared/interfaces/position.ts"/>

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

import {Component, DynamicComponentLoader, Injector, ViewContainerRef} from 'angular2/core';
import {Login, Inventar} from './components/index';
import {PropertiesPipe} from './shared/index';

@Component({
    selector: 'playground',
    templateUrl: 'angular/playground/template.html',
	styleUrls   :   ['angular/playground/style.css'],
	directives: [Login, Inventar],
	pipes: [PropertiesPipe]
})
export class Playground {
	
	private inventarId:string;
	
	static mousePosition:any;
	static mouseMoveEvent:any;
	
	private socket:any;
	private loaded:boolean;
	
    constructor(){ //private dcl: DynamicComponentLoader, private viewContainerRef: ViewContainerRef, private injector: Injector
		this.loaded = false;
		this.socket = io('/playground'); 
		this.socket.emit('getInventar', bind(this.receiveInventar, this));
    }
	
	private receiveInventar(_id){
		this.inventarId = _id;
		this.loaded = true;
	}

	private onMousemove(event) { 
		Playground.mousePosition = { x: event.clientX, y: event.clientY };
		if(Playground.mouseMoveEvent){
			Playground.mouseMoveEvent({ x: event.clientX, y: event.clientY });
		}
	}
	
}
