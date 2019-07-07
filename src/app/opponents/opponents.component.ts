import { SearchBarService } from './../search-bar/search-bar.service';
import { OpponentsService, Opponent } from './opponents.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OpponentComponent } from './opponent/opponent.component';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.css']
})
export class OpponentsComponent implements OnInit {

  opponents: Opponent[] = [];
  opponentsFiltered: Observable<Opponent[]>;
  opponentSelected: Opponent;

  constructor(public dialog: MatDialog, private opponentsService: OpponentsService, 
              private searchBarService: SearchBarService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getOpponents(true);

    this.opponentsFiltered = this.searchBarService.connectSelected();
  }

  onAddOpponent() {
    const dialogRef = this.dialog.open(OpponentComponent, {
      width: '450px', panelClass: 'dialog-full-screen-mobile',
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
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((note: string) => {
      if (note) {
        this.opponentSelected.notes.push(note);
        this.updateOpponent();
      }
    });
  }

  onEditOpponent(opponent: Opponent) {

    const dialogRef = this.dialog.open(OpponentComponent, {
      width: '450px', panelClass: 'dialog-full-screen-mobile',
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
      this._snackBar.open( 'Oops! Something went wrong', null , {
        duration: 2000,
      });
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
      this.searchBarService.setSearchOption(this.opponents, 'cfn');
      if (resetControl) {
        this.searchBarService.resetControl();
      }
    }, (error) => {
      this._snackBar.open( 'Oops! Something went wrong', null , {
        duration: 2000,
      });
    });
  }

  private saveOpponent() {
    this.opponentsService.addOpponent(this.opponentSelected).subscribe((opponent: Opponent) => {
      this.getOpponents(true);
    }, (error) => {
      this._snackBar.open( 'Oops! Something went wrong', null , {
        duration: 2000,
      });
    });
  }

  private updateOpponent() {
    this.opponentsService.updateOpponent(this.opponentSelected).subscribe((opponent: Opponent) => {
      this.getOpponents();
    }, (error) => {
      this._snackBar.open( 'Oops! Something went wrong', null , {
        duration: 2000,
      });
    });
  }

}
