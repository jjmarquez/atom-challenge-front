import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-new-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './new-user-dialog.component.html',
  styleUrl: './new-user-dialog.component.scss',
})
export class NewUserDialogComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  click = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    if (this.form.controls['email'] && this.data && this.data.email) {
      this.form.controls['email'].setValue(this.data.email);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
