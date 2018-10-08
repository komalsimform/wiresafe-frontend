import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
    list:any = [];
  constructor(private datePipe: DatePipe){}
  transform(collection: any, property: string): any {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if(!collection) {
        return null;
    }
    collection.forEach(result => {
        result.date = this.datePipe.transform( result.timestamp,"MMM dd yyyy");
        this.list.push(result);
    });

    const groupedCollection = collection.reduce((previous, current)=> {
        if(!previous[current['date']]) {
            previous[current['date']] = [current];
        } else {
            previous[current['date']].push(current);
        }
        return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => {
        return { key, value: groupedCollection[key] }
    });
}
}