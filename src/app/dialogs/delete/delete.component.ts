import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  //cancel
  onNoClick(): void {
    this.dialogRef.close();
  }

  //send to delete dataService function
  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.number);
  }
}
