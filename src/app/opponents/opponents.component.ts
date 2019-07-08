import { SearchBarService } from './../search-bar/search-bar.service';
import { OpponentsService, Opponent } from './opponents.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { OpponentComponent } from './opponent/opponent.component';
import { NoteComponent } from './note/note.component';
import { SnackbarService } from '../snackbar/snackbar-message.component';

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
    private searchBarService: SearchBarService, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.getOpponents(true);

    this.opponentsFiltered = this.searchBarService.connectSelected();
  }

  onAddOpponent() {
    const dialogRef = this.dialog.open(OpponentComponent, {
      width: '450px', panelClass: 'dialog-full-screen-mobile',
      data: { opponentId: this.createOpponentId() }
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
    const confirmSnackBar$: Subscription = this.openConfirmSnackBar(`Are you sure you want to delete ${opponent.name}`, 'confirm', 'snackbar-main-confirm')
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.opponentsService.deleteOpponent(opponent).subscribe(opponent => {
            this.getOpponents(true);
          }, (error) => {
            this.openSnackBar('Oops! Something went wrong', 'error');
          });
        }
      }, (error) => {
        console.error(error);
      }, () => {
        confirmSnackBar$.unsubscribe();
      });
  }

  onDeleteNote(opponent: Opponent, noteIndex: number) {
    const confirmSnackBar$: Subscription = this.openConfirmSnackBar(`Are you sure you want to delete this note?`, 'confirm', 'snackbar-main-confirm')
      .subscribe((confirm: boolean) => {
        if (confirm) {
          opponent.notes = opponent.notes.filter((note: string, index: number) => {
            return noteIndex !== index;
          });
          this.opponentSelected = opponent;
          this.updateOpponent();
        }
      }, (error) => {
        console.error(error);
      }, () => {
        confirmSnackBar$.unsubscribe();
      });
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
      this.openSnackBar('Oops! Something went wrong', 'error');
    });
  }

  private saveOpponent() {
    this.opponentsService.addOpponent(this.opponentSelected).subscribe((opponent: Opponent) => {
      this.getOpponents(true);
    }, (error) => {
      this.openSnackBar('Oops! Something went wrong', 'error');
    });
  }

  private updateOpponent() {
    this.opponentsService.updateOpponent(this.opponentSelected).subscribe((opponent: Opponent) => {
      this.getOpponents();
    }, (error) => {
      this.openSnackBar('Oops! Something went wrong', 'error');
    });
  }

  private createOpponentId(): number {
    let result: number;
    if (this.opponents && this.opponents.length > 0) {
      result = this.opponents[this.opponents.length - 1].id; // Get the last id
      result++; // Create a new one
    } else {
      result = 0; // First Opponent Id
    }
    return result;
  }

  private openConfirmSnackBar(message, type, className): Observable<boolean> {
    this.snackbarService.status.next({ message: message, type: type, class: className });
    return this.snackbarService.onConfirmSnackbar();
  }

  private openSnackBar(message, type) {
    this.snackbarService.status.next({ message: message, type: type, class: `snackbar-main-${type}`, duration: 4000 });
  }
}
