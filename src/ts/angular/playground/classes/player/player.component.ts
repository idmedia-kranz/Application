import {Component} from 'angular2/core';
import {WorldSize, PropertiesPipe} from '../../shared/index';
import {Playground} from '../../playground.component';
import {Session, Item, Player} from '../index';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'player',
	pipes: [WorldSize, PropertiesPipe],
    templateUrl: 'angular/playground/classes/player/template.html',
	styleUrls: ['angular/playground/classes/player/style.css']
})

export class Player extends Item{

	constructor(){
		super();
    }
	
}