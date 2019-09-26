import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatTable, MatDialogModule} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
// import {MatExpansionModule} from '@angular/material/expansion';

export interface MyData {
  id: number;
  priority: string;
  description: string;
  status: string;
  actions: string;
}

let TABLE_DATA: MyData[] = [
  {id: 1, priority: 'urgent', description: 'error1', status: 'open', actions: ''},
  {id: 2, priority: 'urgent', description: 'error2', status: 'closed', actions: ''},
  {id: 3, priority: 'medium', description: 'error3', status: 'closed', actions: ''},
  {id: 4, priority: 'low', description: 'error4', status: 'open', actions: ''},
  {id: 5, priority: 'medium', description: 'error5', status: 'open', actions: ''},
  {id: 6, priority: 'low', description: 'error6', status: 'open', actions: ''},
  {id: 7, priority: 'urgent', description: 'error7', status: 'open', actions: ''},
  {id: 8, priority: 'low', description: 'error8', status: 'open', actions: ''},
  {id: 9, priority: 'low', description: 'error9', status: 'closed', actions: ''},
  {id: 10, priority: 'low', description: 'error10', status: 'open', actions: ''},
];

@Component({
  selector: 'app-table-filtering',
  templateUrl: './table-filtering.component.html',
  styleUrls: ['./table-filtering.component.css']
})
export class TableFilteringComponent implements OnInit {

  displayedColumns: string[] = ['id', 'priority', 'description', 'status', 'actions'];
  dataSource = new MatTableDataSource(TABLE_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number){
    console.log(id);
    TABLE_DATA = TABLE_DATA.filter(row => row.id !== id);
    this.dataSource = new MatTableDataSource(TABLE_DATA);
    this.table.renderRows();
    this.dataSource.paginator = this.paginator;
  }

  edit(name: string, identity: string, publisher: string) {
    
  }

  add(name: string, identity: string, publisher: string) {
    
  }

}
