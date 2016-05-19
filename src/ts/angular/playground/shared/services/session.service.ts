import {Injectable} from 'angular2/core';

@Injectable()
export class Session {

	public static socket;
	public static login:boolean;
	public static events = {};
	public static actions = ['load', 'update'];
	
	constructor() {
		Session.socket = io('/session');
		Session.setActions();
    }
	
	private static setAction(_action){
		Session.socket.on(_action, function(_id, _data, _callback){
			if(Session.events[_id]&&Session.events[_id][_action]){
				Session.events[_id][_action](_data, _callback);
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
	
	public static on(_action, _id, _func){
		Session.events[_id] = Session.events[_id] || {};
		Session.events[_id][_action] = _func;
	}
	
	public static load(_id):string{
		return _id+'_load';
	}
	
	public static update(_id):string{
		return _id+'_update';
	}
}