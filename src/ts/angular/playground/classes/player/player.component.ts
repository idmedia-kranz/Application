import {Component} from 'angular2/core';
import {ItemDefinitionService, WorldSize, PropertiesPipe} from '../../shared/index';
import {Playground} from '../../playground.component';
import * as components from '../index';
import {Item} from '../index';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'player',
	providers: [ItemDefinitionService],
	pipes: [WorldSize, PropertiesPipe],
    templateUrl: 'angular/playground/classes/player/template.html',
	styleUrls: ['angular/playground/classes/player/style.css']
})

export class Player extends Item{

	constructor(){ //, @Host(Playground) playground: Playground
		super();
    }
	
}