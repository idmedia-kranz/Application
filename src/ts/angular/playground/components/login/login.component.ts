import {Component, Attribute, ElementRef} from 'angular2/core';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'login',
    templateUrl: 'angular/playground/components/login/template.html',
	styleUrls: ['angular/playground/components/login/style.css']
})

export class Login {
	
	private username:string;
	private passwort:string;
	private socket:any;
	private logged:boolean;
	private error:boolean;
	
	constructor(){
		this.logged = false;
		this.error = false;
		this.socket = io('/login');
	}
	
	public login(){
		this.socket.emit('login', this.username, this.passwort, bind(function(success){
				this.logged = success;
				this.error = !this.logged;
		}, this));
	}
}