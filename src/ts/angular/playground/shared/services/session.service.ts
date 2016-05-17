import {Injectable} from 'angular2/core';

@Injectable()
export class Session {

	private io;
	
	constructor() { //private http: Http
		console.log('Session created')
		this.io = io('/session');
    }
}