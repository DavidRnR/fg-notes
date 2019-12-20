import { Pipe, PipeTransform } from '@angular/core';
import { Opponent } from '../opponents/opponents.service';

@Pipe({
  name: 'orderAz'
})
export class OrderAzPipe implements PipeTransform {

  transform(value: any[], key: string): any {
    value.sort((a: any, b: any) => {
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return -1;
      }
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return value;
  }

}
