import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  drivers: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllDrivers().subscribe((data: any ) => {
      this.drivers = data.data;
      console.log(data.data);
    });
  }

}
