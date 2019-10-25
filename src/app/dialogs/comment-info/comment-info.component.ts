import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.css']
})
export class CommentInfoComponent {

  constructor(public dialogRef: MatDialogRef<CommentInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  //cancel
  onNoClick(): void {
    this.dialogRef.close();
  }

}
