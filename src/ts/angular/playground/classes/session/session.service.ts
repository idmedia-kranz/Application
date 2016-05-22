import {Injectable} from 'angular2/core';
import {Item} from '../index';

@Injectable()
export class Session {

	public static socket;
	public static login:boolean;
	public static actions = ['load', 'update'];
	
	constructor() {
		Session.socket = io('/session');
		Session.setActions();
    }
	
	private static setAction(_action){
		Session.socket.on(_action, function(_id, _data, _callback){
			if(Item.instances[_id] && typeof Item.instances[_id][_action] === "function"){
				Item.instances[_id][_action](_data, _callback);
			} else {
				console.log('Action '+_action+' for '+_id+' not found');
			}
		});
	}
	
	private static setActions(){
		for(var action of Session.actions){
			Session.setAction(action);
		}
	}
}