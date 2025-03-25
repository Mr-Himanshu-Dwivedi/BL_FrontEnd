import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.personForm = this.fb.group({
      id: [data?.id || null],
      fullName: [
        data?.fullName || '',
        [Validators.required, Validators.pattern(/^[A-Z][a-z]+\s[A-Z][a-z]+$/)] // First & Last Name, Capitalized
      ],
      address: [
        data?.address || '',
        [Validators.required, Validators.pattern(/^[#.0-9a-zA-Z\s,-]{5,100}$/)] // Street Address
      ],
      city: [
        data?.city || '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)] // Alphabets & Hyphen
      ],
      state: [
        data?.state || '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)] // Alphabets only
      ],
      zip: [
        data?.zip || '',
        [Validators.required, Validators.pattern(/^\d{6}$/)] // ZIP Code 6-digit
      ],
      phoneNumber: [
        data?.phoneNumber || '',
        [Validators.required, Validators.pattern(/^\d{10}$/)] // 10-digit number only
      ]
    });
  }

  save() {
    if (this.personForm.valid) {
      this.dialogRef.close(this.personForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
