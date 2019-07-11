import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderAz'
})
export class OrderAzPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    value.sort((a: any, b: any) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return value;
  }

}
