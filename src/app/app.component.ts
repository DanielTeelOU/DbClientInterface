//app.component.ts
import { Component, ViewChild } from '@angular/core';

import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxxComponent } from './dialog-boxx/dialog-boxx.component';

export interface UsersData {
  name: string;
  id: number;
  description: string;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1, name: 'Secret of Life', description: 'The secret of life is...'},
  {id: 2, name: 'Antilife Equation', description: 'Ask Cyborg.'},
  {id: 3, name: 'Fountain of Youth', description: 'The Spaniards have already found it!'},
  {id: 4, name: 'Holy Grail', description: "It's the cup that you would least assume."}
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    // var d = new Date();
    var d = uuidv4();
    this.dataSource.push({
      id:parseInt(d),
      name:row_obj.name,
      description:row_obj.description
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

}