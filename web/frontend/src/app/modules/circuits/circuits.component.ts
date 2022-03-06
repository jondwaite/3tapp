import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  data: any;
  columnsToDisplay = ['name', 'location', 'country', 'alt', 'Races', 'url']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService) {

    this.apiService.GetCircuits().subscribe(x => {
      this.data = new MatTableDataSource<circuit>(x);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      const sortState: Sort = {active: 'name', direction: 'asc'}
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

  ngOnInit(): void {
  }

}
