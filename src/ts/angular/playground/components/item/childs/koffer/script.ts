import {Component} from 'angular2/core';
import {Item} from '../../script';

@Component({
    selector: 'koffer',
    templateUrl: 'angular/playground/components/item/template.html',
	styleUrls: ['angular/playground/components/item/style.css']
})

export class Koffer extends Item{
	
    constructor(
		_name:string="Koffer", 
		_image:string="img/koffer.png",
		_size:any={width:3,height:3},
		_position={x:0,y:0}, 
		_inventarpoints:Array<Inventarpoint>=[
			new Inventarpoint({x:0,y:0}),
			new Inventarpoint({x:1,y:0}),
			new Inventarpoint({x:2,y:0}),
			new Inventarpoint({x:0,y:1}),
			new Inventarpoint({x:1,y:1}),
			new Inventarpoint({x:2,y:1}),
			new Inventarpoint({x:0,y:2}),
			new Inventarpoint({x:1,y:2}),
			new Inventarpoint({x:2,y:2})
		]
	){
		super(
			_name, 
			_image,
			_size,
			_position, 
			_inventarpoints
		);
    }
}