import { OpponentsService, Opponent } from './opponents.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { NewOpponentComponent } from './new-opponent/new-opponent.component';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.css']
})
export class OpponentsComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  displayedColumns: string[] = ['cfn', 'name', 'character', 'notes', 'add_note', 'delete'];
  opponents: Opponent[] = [];

  constructor(public dialog: MatDialog, private opponentsService: OpponentsService) {

  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.opponentsService.getOpponents().subscribe( opponents => {
      this.opponents = opponents;
    });
  }

  onAddOpponent () {
    const dialogRef = this.dialog.open(NewOpponentComponent, {
      width: '250px', panelClass: 'dialog-full-screen-mobile'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onAddNote(opponent: Opponent) {
    // this.opponentsService.addNote(o).subscribe( opponents => {
    //   this.opponents = opponents;
    // });

    const dialogRef = this.dialog.open(NoteComponent, {
      width: '250px', panelClass: 'dialog-full-screen-mobile'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  //******************************************************* */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
