import { Component, OnInit } from '@angular/core';
import { _MatTabBodyBase } from '@angular/material';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  
  createTime(){
    var today = new Date();
    var date =  (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateTime = date + ' ' + time;
  }

  constructor() { }

  ngOnInit() {
  }

}
