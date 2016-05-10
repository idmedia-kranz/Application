/// <reference path="shared/interfaces/position.ts"/>
/// <reference path="shared/classes/inventarpoint.ts"/>

import {Component} from 'angular2/core';
import {Item} from './components/item/script';

@Component({
    selector: 'playground',
    templateUrl: 'angular/playground/template.html',
	styleUrls   :   ['angular/playground/style.css'],
	directives: [Item]
})
export class Playground {
	
	static mousePosition:any;
	static mouseMoveEvent:any;
	
	private socket:any;
	private items:Array<any>;
	
    constructor(){
		this.socket = io('http://localhost:3000'); 
		this.socket.emit('getItems', this.bind(this.receiveItems, this));
    }
	
	private receiveItems(_items){
		console.log(_items);
		this.items = _items;
	}

	private onMousemove(event) { 
		Playground.mousePosition = { x: event.clientX, y: event.clientY };
		if(Playground.mouseMoveEvent){
			Playground.mouseMoveEvent({ x: event.clientX, y: event.clientY });
		}
	}
	
	private bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));
}