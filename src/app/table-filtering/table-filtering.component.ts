import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Issue } from '../models/issue';
import { DataSource } from '@angular/cdk/collections';
import { AddComponent } from '../dialogs/add/add.component';
import { EditComponent } from '../dialogs/edit/edit.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { CommentInfoComponent } from '../dialogs/comment-info/comment-info.component';

// export interface MyData {
//   id: number;
//   priority: string;
//   description: string;
//   status: string;
//   createDate: string;
//   closeDate: string;
//   actions: string;
// }

// let TABLE_DATA: MyData[] = [
//   {id: 1, priority: 'urgent', description: 'error1', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 2, priority: 'urgent', description: 'error2', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 3, priority: 'medium', description: 'error3', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 4, priority: 'low', description: 'error4', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 5, priority: 'medium', description: 'error5', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 6, priority: 'low', description: 'error6', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 7, priority: 'urgent', description: 'error7', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 8, priority: 'low', description: 'error8', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 9, priority: 'low', description: 'error9', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
//   {id: 10, priority: 'low', description: 'error10', status: 'open', createDate: '09/27/2019', closeDate: 'N/A', actions: ''},
// ];

@Component({
  selector: 'app-table-filtering',
  templateUrl: './table-filtering.component.html',
  styleUrls: ['./table-filtering.component.css']
})
export class TableFilteringComponent implements OnInit {

  //this is what is actually shown in the table
  displayedColumns = ['id', 'title', 'body', 'state', 'created_at', 'updated_at', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Issue) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, title: string, body: string, state: string, created_at: string, updated_at: string) {
    this.id = id;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {id: id, title: title, body: body, state: state, created_at: created_at, updated_at: updated_at}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, body: string, state: string, number: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: id, title: title, body: body, state: state, number: number}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  showComments(i: number, id: number, title: string, body: string) {
    this.id = id;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(CommentInfoComponent, {
      data: {title: title, body: body}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Issue[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();

    //to  filter
    return merge(...displayDataChanges).pipe(map( () => {
          this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
          const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        const sortedData = this.sortData(this.filteredData.slice());

        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}

  //to sort
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

    switch (this._sort.active) {
      case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
      case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
      case 'body': [propertyA, propertyB] = [a.body, b.body]; break;
      case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
      case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
      case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
    }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
