import {Component, HostListener} from 'angular2/core';

@Component({
    selector: 'item',
    templateUrl: 'angular/playground/components/item/template.html',
	styleUrls: ['angular/playground/components/item/style.css']
})

export class Item {

	public name:string;
	public image:string;
	public size:any;
	public position:any;
	public inventarpoints:Array<Inventarpoint>;
	private dragged:boolean = false;
	private dragStartPosition:any;
	private dragEndPosition:any;
	private originalPosition:any;
	
	@HostListener('mouseup', ['$event'])
	onMouseup(event) { 
		if(this.dragged){
			this.dragged = false;
		}
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
			this.position = this.getDragPosition();
		}
	}
  
    constructor(_name:string="Item", _image:string="img/item.png", _size:any={width:1,heigt:1}, _position:any={x:0,y:0}, _inventarpoints:Array<Inventarpoint>=[]){
		this.name = _name;
		this.image = _image;
		this.size = _size;
		this.position = _position;
		this.inventarpoints = _inventarpoints;
    }
	
	public getDragPosition():number{
		return { 
			x: this.originalPosition.x-Math.floor((this.dragStartPosition.x-this.dragEndPosition.x)/Inventarpoint.size.width), 
			y: this.originalPosition.y-Math.floor((this.dragStartPosition.y-this.dragEndPosition.y)/Inventarpoint.size.height)
		};
	}
	
	public getLeft():number{
		return this.position.x*Inventarpoint.size.width;
	}
	
	public getTop():number{
		return this.position.y*Inventarpoint.size.height;
	}
	
	public getWidth():number{
		return this.size.width*Inventarpoint.size.width;
	}
	
	public getHeight():number{
		return this.size.height*Inventarpoint.size.height;
	}
}