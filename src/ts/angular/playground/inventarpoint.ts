class Inventarpoint {
	
	public position:any;
	static size:any = { width: 50, height: 50 };
	
	constructor(_position:any = {x: 0, y: 0}){
		this.position = _position;
	}
	
	public getLeft():number{
		return this.position.x*Inventarpoint.size.width;
	}
	
	public getTop():number{
		return this.position.y*Inventarpoint.size.height;
	}
	
	public getWidth():number{
		return Inventarpoint.size.width;
	}
	
	public getHeight():number{
		return Inventarpoint.size.height;
	}
}
