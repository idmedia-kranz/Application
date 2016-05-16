import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'worldSize'})
export class WorldSize implements PipeTransform {
	public static grid = 50;
    transform(number:number) : any {
        return Math.round(number*WorldSize.grid);
    }
}