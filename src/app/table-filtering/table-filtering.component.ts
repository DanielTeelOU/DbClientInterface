import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  id: number;
  identity: string;
  publisher: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Venom', identity: 'Eddie Brock', publisher: 'Marvel'},
  {id: 2, name: 'Batman', identity: 'Bruce Wayne', publisher: 'DC'},
  {id: 3, name: 'Captain America', identity: 'Steve Rogers', publisher: 'Marvel'},
  {id: 4, name: 'Spider-Man', identity: 'Peter Parker', publisher: 'Marvel'},
  {id: 5, name: 'Carnage', identity: 'Cletus Kassidy', publisher: 'Marvel'},
  {id: 6, name: 'Green Lantern', identity: 'Hal Jordan', publisher: 'DC'},
  {id: 7, name: 'Superman', identity: 'Clark Kent', publisher: 'DC'},
  {id: 8, name: 'Toxin', identity: 'Pat Mulligan', publisher: 'DC'},
  {id: 9, name: 'Black Canary', identity: 'Dinah Lance', publisher: 'DC'},
  {id: 10, name: 'Deadpool', identity: 'Wade Wilson', publisher: 'Marvel'},
];

@Component({
  selector: 'app-table-filtering',
  templateUrl: './table-filtering.component.html',
  styleUrls: ['./table-filtering.component.css']
})
export class TableFilteringComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'identity', 'publisher'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor() { }

}
