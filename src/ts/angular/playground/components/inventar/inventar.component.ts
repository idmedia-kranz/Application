const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

import {Component, DynamicComponentLoader, ViewContainerRef, ElementRef} from 'angular2/core';
import * as components from '../../classes/index';

@Component({
    selector: 'inventar',
    template: '',
	styleUrls: []
})
export class Inventar {
	
	private data:any = {};
	private id:string;
	private collection = {};
	
    constructor(private dcl: DynamicComponentLoader, private viewContainerRef: ViewContainerRef, private elementRef: ElementRef){
    }
	
	public ngAfterViewInit() {
		if(this.id = this.elementRef.nativeElement.getAttribute('id')){
			this.socket = io('/'+this.id); 
			console.log('/'+this.id);
			this.socket.on('loadInventar', bind(this.loadInventar, this));
			this.socket.on('updateInventar', bind(this.updateInventar, this));
		}
	}
	
	private addObject(_type, _id){
		console.log('addObject', _type, _id);
		this.dcl.loadNextToLocation(components[_type], this.viewContainerRef)
		.then((ref:ComponentRef<Type>) => {    
			ref.instance.load(_id);
			ref.instance.parentInventar = this;
			this.collection[_id] = ref;
		});
	}
	
	public loadInventar(_data){
		this.data = _data;
		for(let object of this.data.objects){
			this.addObject(object.class, object.id);
		}
	}
	
	public removeObject(_id){
		console.log(this.collection[_id]);
		this.collection[_id].destroy();
		delete this.collection[_id];
	}
	
	public updateInventar(){
		
	}	
	
	private transferObject(_id, _inventar){
		this.collection[_id].instance.inventar.add(this);
		this.removeObject(_id);
	}
	
	private checkCollision( _object ){
		var points = [];
		var collisions:any = {};
		var id:string = null;
		var point:any = null;
		var x:number = null;
		var y:number = null;
		_object.newParentInventar = null;
		_object.droppable = true;
		
		for(id in this.collection){
			if(id != _object.id)
			for(point of this.collection[id].instance.inventarpoints){
				x = this.collection[id].instance.position.x+point.x;
				y = this.collection[id].instance.position.y+point.y;
				points[x] = points[x] || [];
				points[x][y] = id;				
			}
		}
		for(point of _object.inventarpoints){
			point.collision = false;
			x = _object.position.x+point.x;
			y = _object.position.y+point.y;
			if(id=(points[x]||[])[y]){
				collisions[id] = collisions[id] ? collisions[id]+1 : 1;
				point.collision = true;
				if((collisions[id]/_object.inventarpoints.length) == 1){
					_object.newParentInventar = id;
					_object.droppable = true;
				} else {
					_object.droppable = false;
				}
			}
		}
	}
	
}
