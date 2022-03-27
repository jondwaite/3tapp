import { Component, OnInit } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

export interface StatusData {
  item: string; // Configuration key from Status API return
  value: string; // Current value of the key
  status: boolean; // Boolean representation of the status
  desired: boolean; // Desired state of 'status' in a 'good' application
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  interval: any;

  webhost = environment.WEB_HOSTNAME;
  apphost = environment.APP_HOSTNAME;
  dbhost = environment.DB_HOSTNAME;

  dbData: any[];
  appData: any[];
  webData: any[];

  dbStatus: StatusData[];
  appStatus: StatusData[];
  webStatus: StatusData[];
  columnsToDisplay = ['item', 'value', 'status', 'desired'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.refreshData();

    this.interval = setInterval(() => {
      this.refreshData();
      console.log('tick');
    }, 1000);
  }

  refreshData(): void {
    this.apiService.GetStatusDb().subscribe((x) => {
      this.dbData = x['status'];
      // console.log('dbData:' + JSON.stringify(this.dbData));
      this.dbStatus = [
        {
          item: 'Uptime',
          value: this.dbData['uptime'],
          status: null,
          desired: null,
        },
        {
          item: 'Database Service',
          value: this.dbData['db_running'] ? 'Running' : 'Stopped',
          status: this.dbData['db_running'],
          desired: true,
        },
        {
          item: 'TCP/3306',
          value: this.dbData['tcp_3306_open'] ? 'Open' : 'No Response',
          status: this.dbData['tcp_3306_open'],
          desired: true,
        },
        {
          item: 'Web Server Connectivity',
          value: this.dbData['web_ping'],
          status: this.dbData['web_ping'] ? true : false,
          desired: false,
        },
        {
          item: 'Web port 80 Access',
          value: this.dbData['web_80_open'] ? 'Open' : 'No Response',
          status: this.dbData['web_80_open'],
          desired: false,
        },
        {
          item: 'App Server Connectivity',
          value: this.dbData['app_ping'],
          status: this.dbData['app_ping'] ? true : false,
          desired: false,
        },
        {
          item: 'App port 3002 Access',
          value: this.dbData['app_3002_open'] ? 'Open' : 'No Response',
          status: this.dbData['app_3002_open'],
          desired: false,
        },
      ];
    });

    this.apiService.GetStatusApp().subscribe((x) => {
      this.appData = x['status'];
      // console.log('appData:' + JSON.stringify(this.appData));
      this.appStatus = [
        {
          item: 'Uptime',
          value: this.appData['uptime'],
          status: null,
          desired: null,
        },
        {
          item: 'API Service',
          value: this.appData['3tapp_app_running'] ? 'Running' : 'Stopped',
          status: this.appData['3tapp_app_running'],
          desired: true,
        },
        {
          item: 'TCP/3002',
          value: this.appData['app_3002_open'] ? 'Open' : 'No Response',
          status: this.appData['app_3002_open'],
          desired: true,
        },
        {
          item: 'Web Server Connectivity',
          value: this.appData['web_ping'],
          status: this.appData['web_ping'] ? true : false,
          desired: false,
        },
        {
          item: 'Web port 80 Access',
          value: this.appData['web_80_open'] ? 'Open' : 'No Response',
          status: this.appData['web_80_open'],
          desired: false,
        },
        {
          item: 'DB Server Connectivity',
          value: this.appData['db_ping'],
          status: this.appData['db_ping'] ? true : false,
          desired: false,
        },
        {
          item: 'DB port 3306 Access',
          value: this.appData['db_3306_open'] ? 'Open' : 'No Response',
          status: this.appData['db_3306_open'],
          desired: true,
        },
      ];
    });

    this.apiService.GetStatusWeb().subscribe((x) => {
      this.webData = x['status'];
      // console.log('webData:' + JSON.stringify(this.webData));
      this.webStatus = [
        {
          item: 'Uptime',
          value: this.webData['uptime'],
          status: null,
          desired: null,
        },
        {
          item: 'Nginx Service',
          value: this.webData['nginx_running'] ? 'Running' : 'Stopped',
          status: this.webData['nginx_running'],
          desired: true,
        },
        {
          item: 'Web Application',
          value: this.webData['3tapp_web_running'] ? 'Running' : 'Stopped',
          status: this.webData['3tapp_web_running'],
          desired: true,
        },
        {
          item: 'TCP/80 Open',
          value: this.webData['web_80_open'] ? 'Open' : 'No Response',
          status: this.webData['web_80_open'],
          desired: true,
        },
        {
          item: 'App Server Connectivity',
          value: this.webData['app_ping'],
          status: this.webData['app_ping'] ? true : false,
          desired: true,
        },
        {
          item: 'App port 3002 Access',
          value: this.webData['app_3002_open'] ? 'Open' : 'No Response',
          status: this.webData['app_3002_open'],
          desired: true,
        },
        {
          item: 'DB Server Connectivity',
          value: this.webData['db_ping'],
          status: this.webData['db_ping'] ? true : false,
          desired: false,
        },
        {
          item: 'DB port 3306 Access',
          value: this.webData['db_3306_open'] ? 'Open' : 'No Response',
          status: this.webData['db_3306_open'],
          desired: false,
        },
      ];
    });
  }
}
