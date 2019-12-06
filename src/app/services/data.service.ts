import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Issue } from '../models/issue';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Update } from '../models/update';
import { HomeComponent } from '../home/home.component';

@Injectable()
export class DataService {
  //this is the webhook
  private APP_API_URL = 'https://api.github.com/repos/DanielTeelOU/AssembleWebApp';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  //pulls from webhook for repo
  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.APP_API_URL + '/issues').subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  //the following functions are for localhost demo, they will not post, put, or delete to the webhook
  addIssue (issue: Issue): void {
    this.dialogData = issue;
    issue.created_at = new Date().toISOString();
    issue.updated_at = new Date().toISOString();
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
    issue.created_at = issue.updated_at;
    issue.updated_at = new Date().toISOString();
  }

  deleteIssue (id: number): void {
    //console.log(id);
  }

//--------------------------------------------------------------------------------------------------

//The following functions will work if it is live with an actual URL/endpoint for the app. As it is now only data can be read
  // addIssue (issue: Issue): void {
  //   this.httpClient.post(this.API_URL_ISSUE, issue).subscribe(() => {
  //     this.dialogData = issue;
  //   })
  // }

  // updateIssue (issue: Issue): void {
  //   //this.API_URL_ISSUE = (this.API_URL_ISSUE + '/');
  //   this.httpClient.put((this.API_URL_ISSUE + '/' + issue.id) + issue.number, issue).subscribe(() => {
  //     this.dialogData = issue;
  //   })
  // }

  // deleteIssue (id: number): void {
  //   // console.log(id);
  //   //this.API_URL_ISSUE = (this.API_URL_ISSUE + '/');
  //   this.httpClient.delete(this.API_URL_ISSUE + '/' + id)
  //   .subscribe(data => {
  //     console.log(data['']);
  //   })
  // }
}