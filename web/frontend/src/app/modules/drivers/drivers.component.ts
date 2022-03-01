import { Component, OnInit } from '@angular/core';
import { ApiService, driver } from '../../shared/api.service';

/*
Drivers Table Schema
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| driverId    | int(11)      | NO   | PRI | NULL    | auto_increment |
| driverRef   | varchar(255) | NO   |     |         |                |
| number      | int(11)      | YES  |     | NULL    |                |
| code        | varchar(3)   | YES  |     | NULL    |                |
| forename    | varchar(255) | NO   |     |         |                |
| surname     | varchar(255) | NO   |     |         |                |
| dob         | date         | YES  |     | NULL    |                |
| nationality | varchar(255) | YES  |     | NULL    |                |
| url         | varchar(255) | NO   | UNI |         |                |
+-------------+--------------+------+-----+---------+----------------+
*/

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  data: driver[] = [];
  columnsToDisplay = ['code', 'forename', 'surname', 'number', 'nationality']

  constructor(private apiService: ApiService) { 

    this.apiService.GetDrivers().subscribe(x => {
      this.data = x;
      console.log(this.data);
    })

  }

  ngOnInit(): void {
  }

}
