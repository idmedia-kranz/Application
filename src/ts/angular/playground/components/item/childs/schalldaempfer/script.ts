import {Component} from 'angular2/core';
import {Item} from '../../script';

@Component({
    selector: 'schalldaempfer',
    templateUrl: 'angular/playground/components/item/template.html',
	styleUrls: ['angular/playground/components/item/style.css']
})

export class Schalldaempfer extends Item{
	
    constructor(
		_name:string="Schalldämpfer", 
		_image:string="img/schalldämpfer.png",
		_size:any={width:2,height:1},
		_position={x:0,y:0}, 
		_inventarpoints:Array<Inventarpoint>=[
			new Inventarpoint({x:0,y:0}),
			new Inventarpoint({x:1,y:0}),
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