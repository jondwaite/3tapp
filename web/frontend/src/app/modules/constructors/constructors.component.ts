import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, constructor } from 'src/app/shared/api.service';

/*
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| constructorId  | int(11)      | NO   | PRI | NULL    | auto_increment |
| constructorRef | varchar(255) | NO   |     |         |                |
| name           | varchar(255) | NO   | UNI |         |                |
| nationality    | varchar(255) | YES  |     | NULL    |                |
| url            | varchar(255) | NO   |     |         |                |
+----------------+--------------+------+-----+---------+----------------+
*/

@Component({
  selector: 'app-constructors',
  templateUrl: './constructors.component.html',
  styleUrls: ['./constructors.component.scss']
})
export class ConstructorsComponent implements OnInit {

  data: any;
  columnsToDisplay = ['name', 'nationality', 'url']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private apiService: ApiService) {
    
    this.apiService.GetConstructors().subscribe(x => {
      this.data = new MatTableDataSource<constructor>(x);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      const sortState: Sort = {active: 'name', direction: 'asc'};
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
