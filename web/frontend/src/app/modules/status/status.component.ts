import { Component, OnInit } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

export interface StatusData {
  item: string; // Configuration key from Status API return
  value: string; // Current value of the key
  status: boolean; // Boolean representation of the status
  class: string; // which display class should be assigned ('ok','warn','none')
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
  columnsToDisplay = ['item', 'value', 'status'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.refreshData();

    this.interval = setInterval(() => {
      this.refreshData();
      console.log('tick');
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  refreshData(): void {
    this.apiService.GetStatusDb().subscribe((x) => {
      this.dbData = x['status'];
      // console.log('dbData:' + JSON.stringify(this.dbData));
      this.dbStatus = [
        {
          item: 'Database Service',
          value: this.dbData['db_running'] ? 'Running' : 'Stopped',
          status: this.dbData['db_running'],
          class: this.dbData['db_running'] ? 'ok' : 'warn'
        },
        {
          item: 'TCP/3306',
          value: this.dbData['tcp_3306_open'] ? 'Open' : 'No Response',
          status: this.dbData['tcp_3306_open'],
          class: this.dbData['tcp_3306_open'] ? 'ok' : 'warn'
        },
        {
          item: 'Web Server Connectivity',
          value: this.dbData['web_ping'],
          status: this.dbData['web_ping'] ? true : false,
          class: this.dbData['web_ping'] ? 'warn' : 'ok'
        },
        {
          item: 'Web port 80 Access',
          value: this.dbData['web_80_open'] ? 'Open' : 'No Response',
          status: this.dbData['web_80_open'],
          class: this.dbData['web_80_open'] ? 'warn' : 'ok'
        },
        {
          item: 'App Server Connectivity',
          value: this.dbData['app_ping'],
          status: this.dbData['app_ping'] ? true : false,
          class: this.dbData['app_ping'] ? 'warn': 'ok'
        },
        {
          item: 'App port 3002 Access',
          value: this.dbData['app_3002_open'] ? 'Open' : 'No Response',
          status: this.dbData['app_3002_open'],
          class: this.dbData['app_3002_open'] ? 'warn' : 'ok'
        },
      ];
    });

    this.apiService.GetStatusApp().subscribe((x) => {
      this.appData = x['status'];
      // console.log('appData:' + JSON.stringify(this.appData));
      this.appStatus = [
        {
          item: 'API Service',
          value: this.appData['3tapp_app_running'] ? 'Running' : 'Stopped',
          status: this.appData['3tapp_app_running'],
          class: this.appData['3tapp_app_running'] ? 'ok' : 'warn'
        },
        {
          item: 'TCP/3002',
          value: this.appData['app_3002_open'] ? 'Open' : 'No Response',
          status: this.appData['app_3002_open'],
          class: this.appData['app_3002_open'] ? 'ok' : 'warn'
        },
        {
          item: 'Web Server Connectivity',
          value: this.appData['web_ping'],
          status: this.appData['web_ping'] ? true : false,
          class: this.appData['web_ping'] ? 'warn' : 'ok'
        },
        {
          item: 'Web port 80 Access',
          value: this.appData['web_80_open'] ? 'Open' : 'No Response',
          status: this.appData['web_80_open'],
          class: this.appData['web_80_open'] ? 'warn' : 'ok'
        },
        {
          item: 'DB Server Connectivity',
          value: this.appData['db_ping'],
          status: this.appData['db_ping'] ? true : false,
          class: this.appData['db_ping'] ? 'ok' : 'warn'
        },
        {
          item: 'DB port 3306 Access',
          value: this.appData['db_3306_open'] ? 'Open' : 'No Response',
          status: this.appData['db_3306_open'],
          class: this.appData['db_3306_open'] ? 'ok' : 'warn'
        },
      ];
    });

    this.apiService.GetStatusWeb().subscribe((x) => {
      this.webData = x['status'];
      // console.log('webData:' + JSON.stringify(this.webData));
      this.webStatus = [
        {
          item: 'Nginx Service',
          value: this.webData['nginx_running'] ? 'Running' : 'Stopped',
          status: this.webData['nginx_running'],
          class: this.webData['nginx_running'] ? 'ok' : 'warn'
        },
        {
          item: 'Web Application',
          value: this.webData['3tapp_web_running'] ? 'Running' : 'Stopped',
          status: this.webData['3tapp_web_running'],
          class: this.webData['3tapp_web_running'] ? 'ok' : 'warn'
        },
        {
          item: 'TCP/80 Open',
          value: this.webData['web_80_open'] ? 'Open' : 'No Response',
          status: this.webData['web_80_open'],
          class: this.webData['web_80_open'] ? 'ok' : 'warn'
        },
        {
          item: 'App Server Connectivity',
          value: this.webData['app_ping'],
          status: this.webData['app_ping'] ? true : false,
          class: this.webData['app_ping'] ? 'ok' : 'warn'
        },
        {
          item: 'App port 3002 Access',
          value: this.webData['app_3002_open'] ? 'Open' : 'No Response',
          status: this.webData['app_3002_open'],
          class: this.webData['app_3002_open'] ? 'ok' : 'warn'
        },
        {
          item: 'DB Server Connectivity',
          value: this.webData['db_ping'],
          status: this.webData['db_ping'] ? true : false,
          class: this.webData['db_ping'] ? 'warn' : 'ok'
        },
        {
          item: 'DB port 3306 Access',
          value: this.webData['db_3306_open'] ? 'Open' : 'No Response',
          status: this.webData['db_3306_open'],
          class: this.webData['db_3306_open'] ? 'warn' : 'ok'
        },
      ];
    });
  }
}
