import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SearchBarService } from './search-bar.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  dataValues: [];
  myControl = new FormControl();
  filteredValues: Observable<any[]>;
  fieldCompare: string;

  constructor(public searchBarService: SearchBarService) { }

  ngOnInit() {
    this.filteredValues = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.searchBarService.connect().subscribe((result: any) => {
      this.dataValues = result;
      if (this.dataValues.length === 0) {
        this.myControl.disable();
      } else {
        this.myControl.enable();
      }
    });

    this.searchBarService.getResetControl().subscribe((clean) => {
      if (clean) {
        this.myControl.reset();
        this.searchBarService.setSelectedValue([...this.dataValues]);
      }
    });
  }

  onSelectOption($event: MatAutocompleteSelectedEvent) {
    const valueSelected = this.dataValues.find((v: any) => {
      return v.cfn === $event.option.value;
    });
    this.searchBarService.setSelectedValue([valueSelected]);
  }

  private _filter(value: string): any {
    const filterValue = (value) ? value.toLowerCase() : '';

    return this.dataValues.filter((op: any) => {
      return (op.cfn.toLowerCase().indexOf(filterValue) === 0)
        || (op.character.name.toLowerCase().indexOf(filterValue) === 0);
    });
  }

}
