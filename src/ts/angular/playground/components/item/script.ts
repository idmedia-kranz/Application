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

	public id:string;
	public name:string;
	public image:string;
	public imageOpen:string;
	public size:any;
	public position:any;
	public inventarpoints:Array<Inventarpoint>;
	
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
    }
	
	public updateData(_data){
		console.log('updateData', _data);
		this.position = _data.position;
	}
	
	public ngAfterViewInit() {
		this.id = this.elementRef.nativeElement.getAttribute('id');
		this.socket = io('/'+this.id); 
		console.log('/'+this.id);
		this.socket.on('loadItem', this.bind(this.loadItem, this));
		this.socket.on('updateData', this.bind(this.updateData, this));
	}
	
	private loadItem(_item){
		console.log('loadItem', _item);
		this.type = _item.type;
		this.definition = this.itemDefinitionService.getDefinition(this.type);
		this.name = this.definition.name;
		this.image = this.definition.image;
		this.imageOpen = this.definition.imageOpen;
		this.size = this.definition.size;
		this.inventarpoints = this.definition.inventarpoints;
		this.position = _item.position;
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
			this.socket.emit('updateData', {position: this.position});
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