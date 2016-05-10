/// <reference path="shared/interfaces/position.ts"/>
/// <reference path="shared/classes/inventarpoint.ts"/>

import {Component} from 'angular2/core';
import {Item} from './components/item/script';

@Component({
    selector: 'playground',
    templateUrl: 'angular/playground/template.html',
	styleUrls   :   ['angular/playground/style.css'],
	directives: [Item]
})
export class AppComponent {
    constructor(){
    }
}