import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'angular/editor/template.html',
	styleUrls   :   ['angular/editor/style.css']
})
export class AppComponent {
	socket = null;
 
    constructor(){
        this.socket = io('http://localhost:3000');  
    }
	
}
/*import {Component, ElementRef, AfterViewInit} from 'angular2/core';

declare var $:JQueryStatic;

@Component({
    selector: 'my-app',
    templateUrl: 'angular/editor/template.html',
	styleUrls   :   ['angular/editor/style.scss']
})
export class AppComponent implements AfterViewInit {
	static initialized = false;
	socket = null;
 
    constructor(private el:ElementRef){
        this.socket = io('http://localhost:3000');  
    }
	
	ngAfterViewInit() {
		console.log('AfterViewInit');
        if(!AppComponent.initialized) {
			
			var tree = [
			  {
				text: "Parent 1",
				nodes: [
				  {
					text: "Child 1",
					nodes: [
					  {
						text: "Grandchild 1"
					  },
					  {
						text: "Grandchild 2"
					  }
					]
				  },
				  {
					text: "Child 2"
				  }
				]
			  },
			  {
				text: "Parent 2"
			  },
			  {
				text: "Parent 3"
			  },
			  {
				text: "Parent 4"
			  },
			  {
				text: "Parent 5"
			  }
			];
		
		
            $(this.el.nativeElement).find('#tree').treeview({
			  data: tree, 
			  levels: 5
			});
			
            AppComponent.initialized = true;
        }
    }
}
*/