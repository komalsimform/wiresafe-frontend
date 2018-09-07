import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  constructor(private datePipe: DatePipe){}
  transform(value: Array<any>, field: string): Array<any> {
    console.log('pipe.......',field);
    if(!value) {
      return null;
    }
    const groupedObj = value.reduce((prev, cur)=> {
      if(!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => {
      console.log('group key',groupedObj[key]);
        return { key, value: groupedObj[key] }
    });
  }
}