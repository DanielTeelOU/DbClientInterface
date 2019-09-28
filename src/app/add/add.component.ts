import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  add(id: number, description: string, priority: string, status: string, createDate: string) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    createDate = mm + '/' + dd + '/' + yyyy;
    createDate = createDate.toString();

    id = new Date().getUTCMilliseconds();

    console.log(createDate);
    console.log(id);
  }


  constructor() { }

  ngOnInit() {
  }

}
