import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  noteForm: FormGroup;
  submitted = false;
  
  constructor(public dialogRef: MatDialogRef<NoteComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {

    this.submitted = true;

    if (this.noteForm.valid) {

      this.dialogRef.close(this.noteForm.get('note').value);

    }
  }

  private createForm() {
    this.noteForm = this.formBuilder.group({
      note: [null, [Validators.required, Validators.maxLength(255)]],
    });
  }
}
