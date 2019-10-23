import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-githubupdates',
  templateUrl: './githubupdates.component.html',
  styleUrls: ['./githubupdates.component.css']
})
export class GithubupdatesComponent implements OnInit {

  //connect this to the webhook as well to show pushes, commmits, and merges

  constructor() { }

  ngOnInit() {
  }

}
