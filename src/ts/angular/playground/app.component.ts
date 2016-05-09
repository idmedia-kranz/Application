/// <reference path="interfaces.ts"/>
/// <reference path="inventarpoint.ts"/>

import {Component} from 'angular2/core';
import {Item} from './components/item/script';
import {Rucksack} from './components/item/childs/rucksack/script';
import {Koffer} from './components/item/childs/koffer/script';
import {Pistole} from './components/item/childs/pistole/script';
import {Schalldaempfer} from './components/item/childs/schalldaempfer/script';

@Component({
    selector: 'playground',
    templateUrl: 'angular/playground/template.html',
	styleUrls   :   ['angular/playground/style.css'],
	directives: [Item, Rucksack, Koffer, Schalldaempfer, Pistole]
})
export class AppComponent {
    constructor(){
    }
}