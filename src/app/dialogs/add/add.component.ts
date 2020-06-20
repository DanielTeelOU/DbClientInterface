import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  constructor(public dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Issue,
              public dataService: DataService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.account,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('account') ? 'Not a valid account' :
    '';
  }

  submit() {
  }

  // cancel
  onNoClick(): void {
    this.dialogRef.close();
  }

  // send to the add function in dataService
  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }
}
