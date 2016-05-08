import {Component} from 'angular2/core';
@Component({
    selector: 'my-app',
    templateUrl: 'angular/firstapp.html',
	styleUrls   :   ['angular/master.css', 'angular/firstapp.css','angular/firstapp2.css','angular/firstapp3.css']
})
export class AppComponent { 
	socket = null;
 
    constructor(){
        this.socket = io('http://localhost:3000');  
    }
}