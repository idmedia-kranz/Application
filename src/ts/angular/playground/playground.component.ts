/// <reference path="shared/interfaces/position.ts"/>

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

import {Component, DynamicComponentLoader, ViewContainerRef} from 'angular2/core';
import {Login, Inventar} from './components/index';
import {PropertiesPipe, Session} from './shared/index';

@Component({
    selector: 'playground',
    templateUrl: 'angular/playground/template.html',
	styleUrls   :   ['angular/playground/style.css'],
	directives: [Login, Inventar],
	pipes: [PropertiesPipe],
	providers: [Session]
})
export class Playground {
	
	private inventarId:string;
	
	static mousePosition:any;
	static mouseMoveEvent:any;
	
	private socket:any;
	private loaded:boolean;
	
    constructor(private session:Session){
		Session.socket.on('loadPlayground', bind(this.receiveInventar, this));
		this.loaded = false;
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
