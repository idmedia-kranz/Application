import {Component, Attribute, ElementRef} from 'angular2/core';
import {Session} from '../../shared/index';

const bind = (f, context, ...x) => (...y) => f.apply(context, x.concat(y));

@Component({
    selector: 'login',
    templateUrl: 'angular/playground/components/login/template.html',
	styleUrls: ['angular/playground/components/login/style.css']
})

export class Login {
	
	private username:string;
	private passwort:string;
	private logged:boolean;
	private error:boolean;
	
	constructor(private session: Session){
		this.logged = false;
		this.error = false;
	}
	
	public login(){
		this.session.emit('login', this.username, this.passwort, bind(function(success){
				this.logged = success;
				this.error = !this.logged;
		}, this));
	}
}