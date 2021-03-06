import { Character } from '../opponents.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OpponentsService, Opponent } from '../opponents.service';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.css']
})
export class OpponentComponent implements OnInit {

  opponentForm: FormGroup;
  submitted = false;
  spinner = false;

  characters: Character[] = [];
  characterSelected: Character;
  opponent: Opponent;
  opponentId: number;

  constructor(public dialogRef: MatDialogRef<OpponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, public opponentsService: OpponentsService) {
    // Get id when create a new Opponent
    if (data.opponentId !== undefined) { // Compare against undefined because opponentId could be 0 or 1
      this.opponentId = data.opponentId;
    }
    // Get Opponent when edit
    if (data.opponent) {
      this.opponent = data.opponent;
    }
  }

  ngOnInit() {
    this.createForm();

    this.opponentsService.getCharacters().subscribe((characters: Character[]) => {
      this.characters = characters;
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.opponentForm.valid) {
      // Show Loading
      this.spinner = true;

      const opponent: Opponent = {
        id: (this.opponent) ? this.opponent.id : this.opponentId,
        cfn: this.opponentForm.get('cfn').value,
        // name: this.opponentForm.get('name').value,
        character: this.characterSelected,
        notes: (this.opponent) ? this.opponent.notes : this.getNoteValue(this.opponentForm.get('note').value)
      };

      this.dialogRef.close(opponent);
    }
  }

  onSelectCharacter($event) {
    this.characterSelected = this.characters.find((char: Character) => {
      return char.id === $event.value;
    });
  }

  private createForm() {
    this.characterSelected = (this.opponent && this.opponent.character.id) ? this.opponent.character : null;

    this.opponentForm = this.formBuilder.group({
      cfn: [(this.opponent && this.opponent.cfn) ? this.opponent.cfn : null, [Validators.required, Validators.maxLength(25)]],
      // name: [(this.opponent && this.opponent.name) ? this.opponent.name : null, [Validators.required, Validators.maxLength(30)]],
      character: [(this.characterSelected) ? this.characterSelected.id : null, [Validators.required]],
      note: [null, [Validators.maxLength(80)]],
    });
  }

  private getNoteValue(value: string): string[] {
    if (value) {
      const result =  value.trim();
      if (result === '') {
        return [];
      }
      return [result];
    }
    return [];
  }
}
