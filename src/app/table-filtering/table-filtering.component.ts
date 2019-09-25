import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatTable} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

export interface MyData {
  id: number;
  name: string;
  identity: string;
  publisher: string;
  delete: string;
}

let TABLE_DATA: MyData[] = [
  {id: 1, name: 'Venom', identity: 'Eddie Brock', publisher: 'Marvel', delete: ''},
  {id: 2, name: 'Batman', identity: 'Bruce Wayne', publisher: 'DC', delete: ''},
  {id: 3, name: 'Captain America', identity: 'Steve Rogers', publisher: 'Marvel', delete: ''},
  {id: 4, name: 'Spider-Man', identity: 'Peter Parker', publisher: 'Marvel', delete: ''},
  {id: 5, name: 'Carnage', identity: 'Cletus Kassidy', publisher: 'Marvel', delete: ''},
  {id: 6, name: 'Green Lantern', identity: 'Hal Jordan', publisher: 'DC', delete: ''},
  {id: 7, name: 'Superman', identity: 'Clark Kent', publisher: 'DC', delete: ''},
  {id: 8, name: 'Toxin', identity: 'Pat Mulligan', publisher: 'DC', delete: ''},
  {id: 9, name: 'Black Canary', identity: 'Dinah Lance', publisher: 'DC', delete: ''},
  {id: 10, name: 'Deadpool', identity: 'Wade Wilson', publisher: 'Marvel', delete: ''},
];

@Component({
  selector: 'app-table-filtering',
  templateUrl: './table-filtering.component.html',
  styleUrls: ['./table-filtering.component.css']
})
export class TableFilteringComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'identity', 'publisher', 'delete'];
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

  // ngAfterViewInit(){
  //   this.dataSource.paginator = this.paginator;
  // }
  
}
