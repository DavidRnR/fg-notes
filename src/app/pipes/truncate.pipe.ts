import { Pipe, PipeTransform, ElementRef } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  breakpoint = 400;

  constructor(private elmRef: ElementRef) { }
  transform(value: any, ...args: any[]): any {
    return this.truncateText(value, args);
  }

  private truncateText(text, args = [10]): string {
    let result = '';
    const wordArray = text.split('');
    let wordArrayTemp = [...wordArray]; // Clone Original text

    if (this.elmRef.nativeElement.children[0].offsetWidth > this.breakpoint || text.length <= args[0]) {
      return text;
    } else {
      while (wordArrayTemp.length > args[0]) {
        wordArrayTemp.pop();
        result = wordArrayTemp.join('') + '...';
      }
    }

    return result;
  };
}
