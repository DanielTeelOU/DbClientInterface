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
import { CommentInfoComponent } from '../dialogs/comment-info/comment-info.component';

@Component({
  selector: 'app-table-filtering',
  templateUrl: './table-filtering.component.html',
  styleUrls: ['./table-filtering.component.css']
})
export class TableFilteringComponent implements OnInit {

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  // this is what is actually shown in the table
  displayedColumns = ['id', 'title', 'body', 'state', 'created_at', 'updated_at', 'actions'];
  imaginaryDatabase: DataService | null;
  dataSource: IssueDataSource | null;
  index: number;
  id: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  static loadData() {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  // reroute to add pop-up
  addNew() {
    const issue: Issue = new Issue();
    const dialogRef = this.dialog.open(AddComponent, {
      data: { issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.imaginaryDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  // reroute to edit pop-up
  // tslint:disable-next-line:variable-name
  startEdit(i: number, id: number, title: string, body: string, state: string, created_at: string, updated_at: string) {
    this.id = id;
    this.index = i;
    // console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {id, title, body, state, created_at, updated_at}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.imaginaryDatabase.dataChange.value.findIndex(x => x.id === this.id);
        this.imaginaryDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  // reroute to delete pop-up
  // tslint:disable-next-line:variable-name
  deleteItem(i: number, id: number, title: string, body: string, state: string, number: number) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id, title, body, state, number }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.imaginaryDatabase.dataChange.value.findIndex(x => x.id === this.id);
        this.imaginaryDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  // reroute to show pop-up
  showComments(i: number, id: number, title: string, body: string) {
    this.id = id;
    this.index = i;
    // console.log(this.index);
    const dialogRef = this.dialog.open(CommentInfoComponent, {
      data: {title, body}
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
    this.imaginaryDatabase = new DataService(this.httpClient);
    this.dataSource = new IssueDataSource(this.imaginaryDatabase, this.paginator, this.sort);
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

// fetch data from API, enable filtering and pagination
export class IssueDataSource extends DataSource<Issue> {
  // tslint:disable-next-line:variable-name
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  // tslint:disable:variable-name
  constructor(public _imaginaryDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }
  // tslint:enable:variable-name

  connect(): Observable<Issue[]> {
    const displayDataChanges = [
      this._imaginaryDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._imaginaryDatabase.getAllIssues();

    // to  filter
    return merge(...displayDataChanges).pipe(map( () => {
          this.filteredData = this._imaginaryDatabase.data.slice().filter((issue: Issue) => {
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

  // to sort
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
