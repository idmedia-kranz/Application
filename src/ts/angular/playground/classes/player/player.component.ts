import {Component} from 'angular2/core';
import {ItemDefinitionService, WorldSize, PropertiesPipe, Session} from '../../shared/index';
import {Playground} from '../../playground.component';
import {Item, Player} from '../index';
import {Session, WorldSize, PropertiesPipe} from '../../shared/index';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'player',
	providers: [ItemDefinitionService],
	pipes: [WorldSize, PropertiesPipe],
    templateUrl: 'angular/playground/classes/player/template.html',
	styleUrls: ['angular/playground/classes/player/style.css']
})

export class Player extends Item{

	constructor(){
		super();
    }
	
}