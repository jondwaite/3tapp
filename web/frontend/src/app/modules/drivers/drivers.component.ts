import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, driver } from '../../shared/api.service';
import { Router } from '@angular/router';

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

  data: any;
  columnsToDisplay = ['forename', 'surname', 'code', 'number', 'nationality', 'dob', 'age', 'url'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService, private router: Router) {

    this.apiService.GetDrivers().subscribe(x => {
      this.data = new MatTableDataSource<driver>(x);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      const sortState: Sort = {active: 'surname', direction: 'asc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.disableClear = true;
      this.sort.sortChange.emit(sortState);
      console.log(this.data);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  navigateTo(row: any) {
    this.router.navigate(['/driverdetail/'+row.driverId]);
  }

  getCurrentAge(dob: Date) {
    var birthdate = new Date(dob)
    var today = new Date();
    var years = today.getFullYear() - birthdate.getFullYear();
    var months = today.getMonth() - birthdate.getMonth();
    if (months < 0) {
      months += 12;
      years--;
    }
    if (months === 0 && today.getDate() < birthdate.getDate()) {
      years--;
      months += 11;
    }

    if (months === 1) {
      return (years+" Yrs "+months+" Mth")
    } else {
      return(years+" Yrs "+months+" Mths")
    }

  }

  ngOnInit(): void {
  }

}

