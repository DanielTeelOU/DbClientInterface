import { Component, OnInit, Input } from '@angular/core';
import { string } from 'prop-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public USER_API_URL: string;
  static API_URL: any;

  //gets the API url for use across the app
  enter() {
    console.log(this.USER_API_URL);
    HomeComponent.API_URL = this.USER_API_URL;
    console.log(HomeComponent.API_URL);
  }

  constructor() { }

  ngOnInit() {
  }

}
