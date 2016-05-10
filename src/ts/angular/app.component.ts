import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'angular/template.html',
	styleUrls   :   ['angular/style.css']
})
export class AppComponent { 
	socket = null;
 
    constructor(){
        this.socket = io('http://localhost:3000');  
    }
}