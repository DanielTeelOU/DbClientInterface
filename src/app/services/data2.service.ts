import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Update } from '../models/update';

@Injectable()
export class UpDataService {
  // this is the webhook
  private API_URL = 'https://api.github.com/repos/DanielTeelOU/AssembleWebApp'; // TODO: make this a variable that users can input

  dataChange: BehaviorSubject<Update[]> = new BehaviorSubject<Update[]>([]);

  constructor(private httpClient: HttpClient) {}

  // pulls from webhook for repo
  get data(): Update[] {
    return this.dataChange.value;
  }

  getAllUpdates(): void {
    this.httpClient.get<Update[]>(this.API_URL + '/commits').subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
}
