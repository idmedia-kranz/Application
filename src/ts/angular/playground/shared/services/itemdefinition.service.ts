//import {Http, Response} from '@angular/http';
import {Injectable} from 'angular2/core';
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';

@Injectable()
export class ItemDefinitionService {

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
			}
		};//this.http.get('assets/pizza.json').map((res: Response) => res.json());
    }
	
    getDefinition(_type:string) {
        return this.definitions[_type];
    }
}