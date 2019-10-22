import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://api.github.com/repos/DanielTeelOU/AssembleWebApp/issues';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  addIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }
}