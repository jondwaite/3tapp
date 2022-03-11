import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

export interface TableData {
  item: string;
  value: string;
}

@Component({
  selector: 'app-driverdetail',
  templateUrl: './driverdetail.component.html',
  styleUrls: ['./driverdetail.component.scss']
})
export class DriverdetailComponent implements OnInit {

  driverId: number;
  private sub: any;
  driverData: any;
  tableData: TableData[];
  columnsToDisplay = ['item','value'];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.driverId = +params['id'];
    });

    this.apiService.GetDriverDetails(this.driverId).subscribe((data: any) => {
      this.driverData = data;
      const podiums = this.driverData.finishes['1'] + this.driverData.finishes['2'] + this.driverData.finishes['3'];
      const dobDate = new Date(this.driverData.dob)
      const dobyyyy = dobDate.getFullYear();
      const dobmm = dobDate.getMonth() + 1;
      const dobdd = dobDate.getDate();
      const dobstr = dobdd + '/' + dobmm + '/' + dobyyyy;

      this.tableData = [
        {item: 'Nationality', value: (this.driverData.nationality)},
        {item: 'Date of Birth', value: dobstr},
        {item: 'Racing Number', value: this.driverData.number},
        {item: 'Racing Ticker', value: this.driverData.code},
        {item: 'Race Starts', value: this.driverData.starts},
        {item: 'Race Wins', value: this.driverData.finishes['1']},
        {item: 'Pole Positions', value: this.driverData.grid['1']},
        {item: '2nd Places', value: this.driverData.finishes['2']},
        {item: '3rd Places', value: this.driverData.finishes['3']},
        {item: 'Podium Finishes', value: podiums},
        {item: 'Win Percent', value: ((this.driverData['finishes']['1']/this.driverData['starts']*100).toFixed(1) + '%')},
        {item: 'Podium Percent', value: (podiums/this.driverData['starts']*100).toFixed(1) + '%' },
        {item: 'Career Points', value: this.driverData.points}
      ];

      // console.log(this.driverData);
      // console.log('Starts: ' + this.driverData['starts']);
      // console.log('Wins: ' + this.driverData['finishes']['1']);
      // this.winperc = ((this.driverData['finishes']['1']/this.driverData['starts']*100).toFixed(1) + '%');
      // this.podiums = this.driverData['finishes']['1'] + this.driverData['finishes']['2'] + this.driverData['finishes']['3'];
      // this.podperc = (this.podiums/this.driverData['starts']*100).toFixed(1) + '%';
      // console.log('Win Percentage: ' + this.winperc);
      // console.log('Podiums: ' + this.podiums);
      // console.log('Podiums Percentage: ' + this.podperc);



    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
