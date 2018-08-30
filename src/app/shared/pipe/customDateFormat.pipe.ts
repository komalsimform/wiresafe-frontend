import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'customDateFormat',
})
export class customDateFormatPipe implements PipeTransform {
    constructor(private datePipe: DatePipe){}
    transform(value) {
    var dateval = this.datePipe.transform(value,"MMM dd yyyy");
    var date = new Date();
    let today = this.datePipe.transform(date,"MMM dd yyyy");
    let yesterday = this.datePipe.transform(date.setDate((date.getDate()-1)),"MMM dd yyyy");
    if(dateval == today)
    return "Today";
    else if(dateval == yesterday)
    return "Yesterday";
    else
    return dateval;
    }
}