import {Component, Attribute, ElementRef} from 'angular2/core';
import {ItemDefinitionService, WorldSizePipe} from '../../shared/index';
import {Playground} from '../../app.component';

@Component({
    selector: 'item',
	providers: [ItemDefinitionService],
	pipes: [WorldSizePipe],
    templateUrl: 'angular/playground/components/item/template.html',
	styleUrls: ['angular/playground/components/item/style.css'],
	directives: [Item]
})

export class Item {

	static count:number = 0;
	public id:string;
	public name:string;
	public image:string;
	public imageOpen:string;
	public size:any;
	public position:any;
	public inventarpoints:Array<Inventarpoint>;
	static ready:boolean = false;
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
	
	constructor(private itemDefinitionService: ItemDefinitionService, private elementRef:ElementRef){
		this.socket = io('http://localhost:3000'); 
		this.socket.on('updateItem', this.bind(this.updateItem, this));
    }
	
	public updateItem(_id, _data){
		if(this.id == _id){
			 this.position = _data.position;
		}
	}
	
	public ngAfterViewInit() {
		this.id = this.elementRef.nativeElement.getAttribute('id');
		this.socket.emit('getItem', this.id, this.bind(this.receiveItem, this));
	}
	
	private receiveItem(_item){
		this.type = _item.type;
		this.definition = this.itemDefinitionService.getDefinition(this.type);
		this.name = this.definition.name;
		this.image = this.definition.image;
		this.imageOpen = this.definition.imageOpen;
		this.size = this.definition.size;
		this.inventarpoints = this.definition.inventarpoints;
		this.position = _item.position;
	}
	
	private savePosition(){
		console.log('saveItem', {position: this.position});
		this.socket.emit('saveItem', this.id, {position: this.position});
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
			Playground.mouseMoveEvent = this.bind(this.onMousemove, this);
		} else {
			var _this = this;
			this.transport = true;
			this.savePosition();
			setTimeout(function(){
				_this.dragged = false;
				_this.transport = false;
			}, 500);
			
		}
		event.stopPropagation();
	}

	private onMousemove(_position) { 
		if(this.dragged&&!this.transport){
			this.dragEndPosition = _position;
			this.draggedPosition = this.getDraggedPosition(false);
			this.position = this.getDraggedPosition(true);
		}
	}
  
	private getDraggedPosition(_worldsize:boolean=false):any{
		return { 
			x: (this.originalPosition.x*(!_worldsize?Inventarpoint.size.width:1))-Math.round((this.dragStartPosition.x-this.dragEndPosition.x)/(_worldsize?Inventarpoint.size.width:1)), 
			y: (this.originalPosition.y*(!_worldsize?Inventarpoint.size.width:1))-Math.round((this.dragStartPosition.y-this.dragEndPosition.y)/(_worldsize?Inventarpoint.size.width:1))
		};
	}
	
	private bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));
}