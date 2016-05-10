import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'worldSize'})
export class WorldSizePipe implements PipeTransform {
    transform(number:number) : any {
        return Math.round(number*Inventarpoint.size.width);
    }
}