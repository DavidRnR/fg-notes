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
  filteredOpponents: Observable<any[]>;

  opponents: Opponent[] = [];
  opponentSelected: Opponent;

  constructor(public dialog: MatDialog, private opponentsService: OpponentsService) { }

  ngOnInit() {
    this.filteredOpponents = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value)
      })
    );

    this.getOpponents(true);
  }

  onAddOpponent() {
    const dialogRef = this.dialog.open(NewOpponentComponent, {
      width: '250px', panelClass: 'dialog-full-screen-mobile',
      data: { opponentId: this.opponents.length }
    });

    dialogRef.afterClosed().subscribe((opponent: Opponent) => {
      if (opponent) {
        this.opponentSelected = opponent;
        this.saveOpponent();
      }
    });
  }

  onAddNote(opponent: Opponent) {
    this.opponentSelected = opponent;

    const dialogRef = this.dialog.open(NoteComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((note: string) => {
      if (note) {
        this.opponentSelected.notes.push(note);
        this.updateOpponent();
      }
    });
  }

  onEditOpponent(opponent: Opponent) {

    const dialogRef = this.dialog.open(NewOpponentComponent, {
      width: '250px', panelClass: 'dialog-full-screen-mobile',
      data: { opponent: opponent }
    });

    dialogRef.afterClosed().subscribe((resultOpponent: Opponent) => {
      if (resultOpponent) {
        this.opponentSelected = resultOpponent;
        this.updateOpponent();
      }
    });
  }

  onDeleteOpponent(opponent: Opponent) {
    this.opponentsService.deleteOpponent(opponent).subscribe(opponent => {
      this.getOpponents(true);
    }, (error) => {
      // this.openSnackBar(error, 'error');
      // Hide Loading
    });
  }

  onDeleteNote(opponent: Opponent, noteIndex: number) {
    opponent.notes = opponent.notes.filter((note: string, index: number) => {
      return noteIndex !== index;
    });
    this.opponentSelected = opponent;
    this.updateOpponent();
  }
  //******************************************************* */
  private getOpponents(resetControl = false) {
    this.opponentsService.getOpponents().subscribe(opponents => {
      this.opponents = opponents;
      if (resetControl) {
        this.myControl.reset();
      }
    }, (error) => {
      // this.openSnackBar(error, 'error');
      // Hide Loading
    });
  }

  private saveOpponent() {
    this.opponentsService.addOpponent(this.opponentSelected).subscribe((opponent: Opponent) => {
      this.getOpponents(true);
    }, (error) => {
      // this.openSnackBar(error, 'error');
      // Hide Loading
    });
  }

  private updateOpponent() {
    this.opponentsService.updateOpponent(this.opponentSelected).subscribe((opponent: Opponent) => {
      this.getOpponents(true);
    }, (error) => {
      // this.openSnackBar(error, 'error');
      // Hide Loading
    });
  }

  private _filter(value: string): any {
    const filterValue = (value) ? value.toLowerCase() : '';

    return this.opponents.filter(op => op.cfn.toLowerCase().indexOf(filterValue) === 0);
  }
}
