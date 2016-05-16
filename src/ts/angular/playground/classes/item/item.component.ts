import {Component, forwardRef} from 'angular2/core';
import {ItemDefinitionService, WorldSize, PropertiesPipe} from '../../shared/index';
import {Playground} from '../../playground.component';
import {Inventar} from '../../components/index';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'item',
	providers: [ItemDefinitionService],
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
	private socket:any;
	private children:any;
	private inventarId:string;
	
	public static definitions:any = {};
	public static collection = {};
	
	public inventar = {
		"add": function(_object){
			console.log('Inventar add', _object);
		}
	};
	
	constructor(){ //, @Host(Playground) playground: Playground
    }
	
	public updateItem(_data){
		console.log('updateItem', _data);
		for (var attr in _data) {
			this[attr] = _data[attr];
		}
	}
	
	public load(_id){
		console.log('load', _id);
		if(this.id = _id){
			Item.collection[this.id] = this;
			this.socket = io('/'+this.id); 
			console.log('/'+this.id);
			this.socket.on('loadItem', bind(this.loadItem, this));
			this.socket.on('updateItem', bind(this.updateItem, this));
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
				this.socket.emit('updateItem', {position: this.position});
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