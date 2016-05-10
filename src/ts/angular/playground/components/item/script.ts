import {Component, HostListener} from 'angular2/core';
import {ItemDefinitionService, WorldSizePipe} from '../../shared/index';

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
	public id:number;
	public name:string;
	public image:string;
	public imageOpen:string;
	public size:any;
	public position:any;
	public inventarpoints:Array<Inventarpoint>;
	private open:boolean = false;
	private dragged:boolean = false;
	private dragStartPosition:any;
	private dragEndPosition:any;
	private originalPosition:any;
	private draggedPosition:any = {x:0,y:0};
	private definition:any;
	
	constructor(private itemDefinitionService: ItemDefinitionService){
		this.definition = itemDefinitionService.getDefinition("rucksack");
		this.name = this.definition.name;
		this.image = this.definition.image;
		this.imageOpen = this.definition.imageOpen;
		this.size = this.definition.size;
		this.position = this.definition.position;
		this.inventarpoints = this.definition.inventarpoints;
		this.id=++Item.count;
    }
	
	@HostListener('mouseup', ['$event'])
	onMouseup(event) { 
		if(this.dragged){
			this.dragged = false;
		}
	}

	@HostListener('mouseenter', ['$event'])
	onMouseenter(event) { 
			this.open = true;
	}
	
	@HostListener('mouseleave', ['$event'])
	onMouseleave(event) { 
			this.open = false;
	}
	
	@HostListener('mousedown', ['$event'])
	onMousedown(event) { 
		if(!this.dragged){
			this.originalPosition = this.position;
			this.dragStartPosition = { x: event.clientX, y: event.clientY };
			this.dragged = true;
		}
	}

	@HostListener('mousemove', ['$event'])
	onMousemove(event) { 
		if(this.dragged){
			this.dragEndPosition = { x: event.clientX, y: event.clientY };
			this.draggedPosition = this.getDraggedPosition(false);
			this.position = this.getDraggedPosition(true);
		}
	}
  
	public getDraggedPosition(_worldsize:boolean=false):any{
		return { 
			x: (this.originalPosition.x*(!_worldsize?Inventarpoint.size.width:1))-Math.round((this.dragStartPosition.x-this.dragEndPosition.x)/(_worldsize?Inventarpoint.size.width:1)), 
			y: (this.originalPosition.y*(!_worldsize?Inventarpoint.size.width:1))-Math.round((this.dragStartPosition.y-this.dragEndPosition.y)/(_worldsize?Inventarpoint.size.width:1))
		};
	}
}