import {Component} from 'angular2/core';
import {Item} from '../../script';

@Component({
    selector: 'rucksack',
    templateUrl: 'angular/playground/components/item/template.html',
	styleUrls: ['angular/playground/components/item/style.css']
})

export class Rucksack extends Item{
	
    constructor(
		_name:string="Rucksack", 
		_image:string="img/rucksack.png",
		_size:any={width:6,height:7},
		_position={x:0,y:0}, 
		_inventarpoints:Array<Inventarpoint>=[
			new Inventarpoint({x:2,y:0}),
			new Inventarpoint({x:3,y:0}),
			new Inventarpoint({x:4,y:0}),
			new Inventarpoint({x:4,y:1}),
			new Inventarpoint({x:3,y:1}),
			new Inventarpoint({x:3,y:2}),
			new Inventarpoint({x:4,y:2}),
			new Inventarpoint({x:4,y:3}),
			new Inventarpoint({x:3,y:3}),
			new Inventarpoint({x:5,y:3}),
			new Inventarpoint({x:5,y:2}),
			new Inventarpoint({x:0,y:2}),
			new Inventarpoint({x:0,y:3}),
			new Inventarpoint({x:2,y:1}),
			new Inventarpoint({x:1,y:2}),
			new Inventarpoint({x:2,y:2}),
			new Inventarpoint({x:1,y:3}),
			new Inventarpoint({x:2,y:3}),
			new Inventarpoint({x:0,y:4}),
			new Inventarpoint({x:1,y:4}),
			new Inventarpoint({x:2,y:4}),
			new Inventarpoint({x:3,y:4}),
			new Inventarpoint({x:4,y:4}),
			new Inventarpoint({x:5,y:4}),
			new Inventarpoint({x:1,y:5}),
			new Inventarpoint({x:2,y:5}),
			new Inventarpoint({x:3,y:5}),
			new Inventarpoint({x:4,y:5}),
			new Inventarpoint({x:2,y:6}),
			new Inventarpoint({x:3,y:6}),
			new Inventarpoint({x:4,y:6}),
			new Inventarpoint({x:1,y:1})
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