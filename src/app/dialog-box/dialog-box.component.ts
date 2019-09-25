import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  // constructor(private dialog: any, MatDialog: any) { }

  // openDialog() {
  //   const dialogConfig =  new MatDialogConfig();
  //   dialogConfig.disableClose = false; //set this to true to make it so the user can't close the dialog box by clicking outside of it
  //   dialogConfig.autoFocus = true;

  //   this.dialog.open(DialogBoxComponent, dialogConfig)
  // }

  ngOnInit() {
  }

}
