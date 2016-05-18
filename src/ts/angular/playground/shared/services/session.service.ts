import {Injectable} from 'angular2/core';

@Injectable()
export class Session {

	public socket;
	
	constructor() { //private http: Http
		console.log('Session created')
		this.socket = io('/session');
    }
	
	public static load(_id):string{
		return _id+'_load';
	}
	
	public static update(_id):string{
		return _id+'_update';
	}
}