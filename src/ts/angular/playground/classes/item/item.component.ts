import {Component, forwardRef, Injector} from 'angular2/core';
import {Session, WorldSize, PropertiesPipe} from '../../shared/index';
import {Playground} from '../../playground.component';
import {Inventar} from '../../components/index';
import {Player} from '../index';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'item',
	pipes: [WorldSize, PropertiesPipe],
    templateUrl: 'angular/playground/classes/item/template.html',
	styleUrls: ['angular/playground/classes/item/style.css'],
	directives: [forwardRef(() => Inventar), Item]
})

export class Item {

	public id:string;
	public name:string;
	public image:string;
	public imageOpen:string;
	public size:any;
	public position:any;
	public inventarpoints:Array<any>;
	public parentInventar;
	
	private type:string;
	private open:boolean = false;
	private transport:boolean = false;
	private dragged:boolean = false;
	private dragStartPosition:any;
	private dragEndPosition:any;
	private originalPosition:any;
	private draggedPosition:any = {x:0,y:0};
	private definition:any;
	private children:any;
	private inventarId:string;
	
	public static definitions:any = {};
	public static instances = {};
	
	public inventar = {
		"add": function(_object){
			console.log('Inventar add', _object);
		}
	};
	
	constructor(){
	}
	
	public load(_id){
		console.log('load', _id);
		if(this.id = _id){
			Item.instances[this.id] = this;
			this.emit('load', null, bind(this.loadItem, this));
			this.on('update', bind(this.updateItem, this));
		}
	}
	
	public emit(_action, _data, _callback?){
		Session.socket.emit(_action, this.id, _data, _callback?bind(_callback, this):null);
	}
	
	public on(_eventname, _callback){
		if(this[_eventname]){
			this[_eventname].on(bind(_callback, this));
		} else {
			Session.on(_eventname, this.id, bind(_callback, this));
		}
	}
	
	private loadItem(_item:any, _definition?:any){
		console.log('loadItem', _item, _definition);
		this.type = _item.type;
		if(_definition){
			Item.definitions[this.type] = _definition;
		}
		this.definition = Item.definitions[this.type];
		this.name = this.definition.name;
		this.image = this.definition.image;
		this.imageOpen = this.definition.imageOpen;
		this.size = this.definition.size;
		this.inventarpoints = this.definition.inventarpoints;
		this.position = _item.position || {x: 0, y: 0};
		this.inventarId = _item.inventarId;
		this.children = {};
	}

	public updateItem(_data){
		console.log('updateItem', _data);
		for (var attr in _data) {
			this[attr] = _data[attr];
		}
	}
	
	
	private onMouseenter(event) { 
		if(!this.transport){
			this.open = true;
		}
	}
	
	private onMouseleave(event) { 
			this.open = false;
	}
	
	private onClick(event) { 
		if(!this.dragged){
			this.originalPosition = this.position;
			this.dragStartPosition = { x: event.clientX, y: event.clientY };
			this.dragged = true;
			Playground.mouseMoveEvent = bind(this.onMousemove, this);
		} else {
			if(this.droppable){
				var _this = this;
				this.transport = true;
				this.emit('update', {position: this.position});
				setTimeout(function(){
					_this.dragged = false;
					_this.transport = false;
				}, 500);
				if(this.newParentInventar){
					this.parentInventar.transferObject(this.id, this.newParentInventar);
				}
			}
		}
		event.stopPropagation();
	}
	
	private onMousemove(_position) { 
		if(this.dragged&&!this.transport){
			this.dragEndPosition = _position;
			this.draggedPosition = this.getDraggedPosition(false);
			var newPosition = this.getDraggedPosition(true);
			if(newPosition.x != this.position.x || newPosition.y != this.position.y){
				this.position = newPosition;
				this.parentInventar.checkCollision(this);
			}
		}
	}
  
	private getDraggedPosition(_worldsize:boolean=false):any{
		return { 
			x: (this.originalPosition.x*(!_worldsize?WorldSize.grid:1))-Math.round((this.dragStartPosition.x-this.dragEndPosition.x)/(_worldsize?WorldSize.grid:1)), 
			y: (this.originalPosition.y*(!_worldsize?WorldSize.grid:1))-Math.round((this.dragStartPosition.y-this.dragEndPosition.y)/(_worldsize?WorldSize.grid:1))
		};
	}
	
}