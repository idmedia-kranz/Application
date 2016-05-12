import {Component, Attribute, ElementRef} from 'angular2/core';
import {ObjectDefinitionService, WorldSizePipe} from '../../shared/index';
import {Playground} from '../../app.component';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'object',
	providers: [ObjectDefinitionService],
	pipes: [WorldSizePipe],
    templateUrl: 'angular/playground/components/object/template.html',
	styleUrls: ['angular/playground/components/object/style.css'],
	directives: [Object]
})

export class Object {

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
	
	constructor(private objectDefinitionService: ObjectDefinitionService, private elementRef:ElementRef){
    }
	
	public updateData(_data){
		console.log('updateData', _data);
		for (var attr in _data) {
			this[attr] = _data[attr];
		}
	}
	
	public ngAfterViewInit() {
		this.id = this.elementRef.nativeElement.getAttribute('id');
		this.socket = io('/'+this.id); 
		console.log('/'+this.id);
		this.socket.on('loadObject', bind(this.loadObject, this));
		this.socket.on('updateData', bind(this.updateData, this));
	}
	
	private loadObject(_object){
		console.log('loadObject', _object);
		this.type = _object.type;
		this.definition = this.objectDefinitionService.getDefinition(this.type);
		this.name = this.definition.name;
		this.image = this.definition.image;
		this.imageOpen = this.definition.imageOpen;
		this.size = this.definition.size;
		this.inventarpoints = this.definition.inventarpoints;
		this.position = _object.position;
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
	
}