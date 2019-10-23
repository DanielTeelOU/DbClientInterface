import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  //this is the webhook
  private API_URL = 'https://api.github.com/repos/DanielTeelOU/AssembleWebApp/issues'; //TODO: make this a variable that users can input

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
    this.httpClient.get<Issue[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  //the following functions are for localhost demo, they will not post, put, or delete to the webhook
  addIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

//---------------------------------------------------------------------------------------------------

//The following functions will work if it is live with an actual URL/endpoint for the app. As it is now only data can be read
  // addIssue (issue: Issue): void {
  //   this.httpClient.post(this.API_URL, issue).subscribe(() => {
  //     this.dialogData = issue;
  //   })
  // }

  // updateIssue (issue: Issue): void {
  //   this.API_URL = (this.API_URL + '/');
  //   this.httpClient.put(this.API_URL + issue.number, issue).subscribe(() => {
  //     this.dialogData = issue;
  //   })
  // }

  // deleteIssue (number: number): void {
  //   // console.log(id);
  //   this.API_URL = (this.API_URL + '/');
  //   this.httpClient.delete(this.API_URL + number)
  //   .subscribe(data => {
  //     console.log(data['']);
  //   })
  // }
}