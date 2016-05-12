//import {Http, Response} from '@angular/http';
import {Injectable} from 'angular2/core';
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';

@Injectable()
export class ObjectDefinitionService {

	private definitions:any;
		
	constructor() { //private http: Http
		this.definitions = {
			"rucksack": {
				"name": "Rucksack",
				"image": "img/rucksack.png",
				"imageOpen": "img/rucksack_open.png",
				"size": {width:6,height:7},
				"position": {x:0,y:0},
				"inventarpoints": [
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
			},
			"koffer": {
				"name": "Koffer",
				"image": "img/koffer.png",
				"imageOpen": "img/koffer_open.png",
				"size": {width:3,height:3},
				"position": {x:0,y:0},
				"inventarpoints": [
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
			},
			"pistole": {
				"name": "Pistole",
				"image": "img/pistole.png",
				"imageOpen": "img/pistole_open.png",
				"size": {width:3,height:2},
				"position": {x:0,y:0},
				"inventarpoints": [
					new Inventarpoint({x:0,y:0}),
					new Inventarpoint({x:1,y:0}),
					new Inventarpoint({x:2,y:0}),
					new Inventarpoint({x:2,y:1})
				]
			},
			"object": {
				"name": "Unknown Object",
				"image": "img/object.png",
				"size": {width:1,height:1},
				"position": {x:0,y:0},
				"inventarpoints": []
			}
		};//this.http.get('assets/pizza.json').map((res: Response) => res.json());
    }
	
    getDefinition(_type:string) {
		console.log('getDefinition',_type);
        return this.definitions[_type]||this.definitions["object"];
    }
}