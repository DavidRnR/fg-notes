import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private optionsSubject = new BehaviorSubject<any[]>([]);
  private searchOption = [];
  private optionsSelectedSubject = new BehaviorSubject<any[]>([]);
  private control = new BehaviorSubject<boolean>(false);

  constructor() { }

  public setSearchOption(options: any, fieldCompare: string) {
    this.searchOption = options;
    this.optionsSubject.next(this.searchOption);
    this.optionsSelectedSubject.next(this.searchOption);
  }

  public setSelectedValue (optionSelected: any) {
    this.optionsSelectedSubject.next(optionSelected);
  }

  public resetControl() {
    this.control.next(true);
  }

  public getResetControl(): Observable<boolean> {
    return this.control.asObservable();
  }

  public connectSelected(): Observable<any[]> {
    return this.optionsSelectedSubject.asObservable();
  }

  public connect(): Observable<any[]> {
    return this.optionsSubject.asObservable();
  }

  public disconnect(): void {
    this.optionsSubject.complete();
  }
}
