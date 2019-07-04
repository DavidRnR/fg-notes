import { Character } from './../opponents.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OpponentsService, Opponent } from '../opponents.service';

@Component({
  selector: 'app-new-opponent',
  templateUrl: './new-opponent.component.html',
  styleUrls: ['./new-opponent.component.css']
})
export class NewOpponentComponent implements OnInit {

  opponentForm: FormGroup;
  submitted = false;
  spinner = false;

  characters: Character[] = [];

  constructor(public dialogRef: MatDialogRef<NewOpponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, public opponentsService: OpponentsService ) { }

  ngOnInit() {
    this.createForm();

    this.opponentsService.getCharacters().subscribe( (characters: Character[]) => {
      this.characters = characters;
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.opponentForm.valid) {
      // Show Loading
      this.spinner = true;

      const opponent: Opponent = {
        cfn: this.opponentForm.get('cfn').value,
        name: this.opponentForm.get('name').value,
        character: this.opponentForm.get('character').value,
        notes: [this.opponentForm.get('note').value]
      };

      this.opponentsService.addOpponent(opponent).subscribe((opponent: Opponent) => {
        // this.openSnackBar(message, 'success');
        this.dialogRef.close('add-edit');
        // Hide Loading
        this.spinner = false;
      }, (error) => {
        // this.openSnackBar(error, 'error');
        // Hide Loading
        this.spinner = false;
      });
    }
  }

  private createForm() {
    this.opponentForm = this.formBuilder.group({
      cfn: [null, [Validators.required, Validators.maxLength(50)]],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      character: [null, [Validators.required]],
      note: [null, [Validators.required, Validators.maxLength(255)]],
    });
  }
}
