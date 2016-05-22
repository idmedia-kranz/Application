import {Component, Attribute, ElementRef} from 'angular2/core';
import {Session} from '../index';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'login',
    templateUrl: 'angular/playground/classes/login/template.html',
	styleUrls: ['angular/playground/classes/login/style.css']
})

export class Login {
	
	private username:string;
	private passwort:string;
	private logged:boolean;
	private error:boolean;
	
	constructor(){
		this.logged = false;
		this.error = false;
	}
	
	public login(){
		Session.socket.emit('authenticate', (this.username||'testuser'), this.passwort, bind(function(success){
				this.logged = success;
				this.error = !this.logged;
		}, this));
	}
}