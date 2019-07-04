import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OpponentsService, Note } from '../opponents.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  opponentForm: FormGroup;
  submitted = false;
  spinner = false;
  
  constructor(public dialogRef: MatDialogRef<NoteComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder, public opponentsService: OpponentsService ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {

    this.submitted = true;

    if (this.opponentForm.valid) {
      // Show Loading
      this.spinner = true;

      const note: Note = {
        note: this.opponentForm.get('note').value
      };

      this.opponentsService.addNote(note).subscribe((note: Note) => {
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
      note: [null, [Validators.required, Validators.maxLength(255)]],
    });
  }
}
