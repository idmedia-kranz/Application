//import {Http, Response} from '@angular/http';
import {Injectable} from 'angular2/core';
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';

@Injectable()
export class ItemDefinitionService {

	private definitions:any;
		
	constructor() { //private http: Http
		this.definitions = {};//this.http.get('assets/pizza.json').map((res: Response) => res.json());
    }
	
	addDefinition(_type:string, _definition:any){
		console.log('add definition ', _type);
		this.definitions[_type] = _definition;
	}
	
    getDefinition(_type:string) {
		console.log('getDefinition', _type);
        return this.definitions[_type]||this.definitions["item"];
    }
}