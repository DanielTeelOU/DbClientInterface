import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Update } from '../models/update';

@Injectable()
export class UpDataService {
  //this is the webhook
  private API_URL = 'https://smee.io/HtBebTG4VbFgWqC1';
  //'https://api.github.com/repos/DanielTeelOU/AssembleWebApp'; //TODO: make this a variable that users can input
  private API_URL_COMMITS = 'https://api.github.com/repos/DanielTeelOU/AssembleWebApp/commits'; //I think it's best to just show these
  private API_URL_BRANCHES = 'https://api.github.com/repos/DanielTeelOU/AssembleWebApp/branches';
  private API_URL_MERGES = 'https://api.github.com/repos/DanielTeelOU/AssembleWebApp/merges';

  dataChange: BehaviorSubject<Update[]> = new BehaviorSubject<Update[]>([]);

  constructor (private httpClient: HttpClient) {}

  //pulls from webhook for repo
  get data(): Update[] {
    return this.dataChange.value;
  }

  getAllUpdates(): void {
    this.httpClient.get<Update[]>(this.API_URL_COMMITS).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
}