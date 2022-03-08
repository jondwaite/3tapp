import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  app_host = environment.APP_HOSTNAME;
  web_host = environment.WEB_HOSTNAME;
  db_host = environment.DB_HOSTNAME;

  constructor() { }

  ngOnInit(): void {
  }

}
