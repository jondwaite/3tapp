import { Component, OnInit } from '@angular/core';
import { ApiService, circuit } from 'src/app/shared/api.service';

/*
Circuits Table Schema
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| circuitId  | int(11)      | NO   | PRI | NULL    | auto_increment |
| circuitRef | varchar(255) | NO   |     |         |                |
| name       | varchar(255) | NO   |     |         |                |
| location   | varchar(255) | YES  |     | NULL    |                |
| country    | varchar(255) | YES  |     | NULL    |                |
| lat        | float        | YES  |     | NULL    |                |
| lng        | float        | YES  |     | NULL    |                |
| alt        | int(11)      | YES  |     | NULL    |                |
| url        | varchar(255) | NO   | UNI |         |                |
+------------+--------------+------+-----+---------+----------------+
*/

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.scss']
})
export class CircuitsComponent implements OnInit {

  data: circuit[] = [];
  columnsToDisplay = ['name', 'location', 'country', 'alt']

  constructor(private apiService: ApiService) { 

    this.apiService.GetCircuits().subscribe(x => {
      this.data = x;
      console.log(this.data);
    })
  }

  ngOnInit(): void {
  }

}
