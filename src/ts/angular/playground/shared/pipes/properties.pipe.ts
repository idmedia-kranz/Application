import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'keyValuePair'})
export class PropertiesPipe implements PipeTransform {
  transform(dict: Object): Array<any> {
    var a = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a;
  }
}