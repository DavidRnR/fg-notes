import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private elmRef: ElementRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.elmRef.nativeElement.focus();
    }, 250);
  }

}
