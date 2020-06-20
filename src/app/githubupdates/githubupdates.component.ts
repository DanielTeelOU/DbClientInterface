import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UpDataService } from '../services/data2.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Update } from '../models/update';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-githubupdates',
  templateUrl: './githubupdates.component.html',
  styleUrls: ['./githubupdates.component.css']
})
// connect this to the webhook as well to show pushes
export class GithubupdatesComponent implements OnInit {

  // this is what is actually shown in the table
  displayedColumns = ['html_url', 'actions'];
  imaginaryDatabase2: UpDataService | null;
  dataSource: UpdateDataSource | null;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
              public dataService: UpDataService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.imaginaryDatabase2 = new UpDataService(this.httpClient);
    this.dataSource = new UpdateDataSource(this.imaginaryDatabase2, this.paginator, this.sort);
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

  // reroute to commit url
  // tslint:disable-next-line:variable-name
  visit(i: number, html_url: string) {
    this.index = i;
    // location.href = html_url;
    window.open(html_url, '_blank');
  }
}

// this class fetches the data from the API, enables filtering and pagination
export class UpdateDataSource extends DataSource<Update> {
  // tslint:disable-next-line:variable-name
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Update[] = [];
  renderedData: Update[] = [];

  // tslint:disable:variable-name
  constructor(public _imaginaryDatabase2: UpDataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }
  // tslint:enable:variable-name

  connect(): Observable<Update[]> {
    const displayDataChanges = [
      this._imaginaryDatabase2.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._imaginaryDatabase2.getAllUpdates();

    // to  filter
    return merge(...displayDataChanges).pipe(map( () => {
      this.filteredData = this._imaginaryDatabase2.data.slice().filter((update: Update) => {
          const searchStr = (update.html_url).toString().toLowerCase();
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
  sortData(data: Update[]): Update[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
      // case 'committer': [propertyA, propertyB] = [a.date, b.date]; break;
      // case 'commit': [propertyA, propertyB] = [a.login, b.login]; break;
      case 'html_url': [propertyA, propertyB] = [a.message, b.message]; break;
    }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
