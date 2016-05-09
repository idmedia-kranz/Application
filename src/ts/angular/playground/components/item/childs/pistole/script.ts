import {Component} from 'angular2/core';
import {Item} from '../../script';

@Component({
    selector: 'pistole',
    templateUrl: 'angular/playground/components/item/template.html',
	styleUrls: ['angular/playground/components/item/style.css']
})

export class Pistole extends Item{
	
    constructor(
		_name:string="Pistole", 
		_image:string="img/pistole.png",
		_size:any={width:3,height:2},
		_position={x:0,y:0}, 
		_inventarpoints:Array<Inventarpoint>=[
			new Inventarpoint({x:0,y:0}),
			new Inventarpoint({x:1,y:0}),
			new Inventarpoint({x:2,y:0}),
			new Inventarpoint({x:2,y:1})
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