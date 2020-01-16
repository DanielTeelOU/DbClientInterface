import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //public USER_API_URL: string;
  public USER_API_URL: any;

  //gets the API url for use across the app
  enter() {
    console.log(this.USER_API_URL);
    //HomeComponent.API_URL = this.USER_API_URL;
    //console.log(HomeComponent.API_URL);
    //TableFilteringComponent.refresh();
  }

  reload(){
    window.location.reload(true)
  }

  constructor() { }

  ngOnInit() {
  }

}
